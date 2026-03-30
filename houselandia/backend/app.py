from flask import Flask, request, jsonify
from flask_cors import CORS
import json 
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import os # Necessary to read Environment Variables

app = Flask(__name__)

# Updated CORS: Allow your specific Vercel frontend for better security
CORS(app, resources={r"/api/*": {"origins":"https://houselandia.vercel.app"}})

# 1. Production Database Configuration
# It falls back to local sqlite only if DATABASE_URL isn't found.
database_url = os.environ.get('DATABASE_URL')
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url or 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# 2. User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False) # Increased length for production hashes

# 3. Signup Route
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_pw)
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

# 4. Login Route
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get('email')).first()

    if user and bcrypt.check_password_hash(user.password, data.get('password')):
        return jsonify({"message": "Login successful", "email": user.email}), 200
    
    return jsonify({"error": "Invalid email or password"}), 401

@app.route('/')
def home():
    return {"status": "Houselandia API is running"}, 200

class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type = db.Column(db.String(50))
    location = db.Column(db.String(100))
    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    surface = db.Column(db.String(50))
    price = db.Column(db.Integer)
    image = db.Column(db.String(500))
    imageLg = db.Column(db.String(500))
    description = db.Column(db.Text)
    status = db.Column(db.String(20), default="Available")
    
    # We store these as Text and convert to JSON in the routes
    gallery = db.Column(db.Text) 
    agent = db.Column(db.Text) 

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "location": self.location,
            "bedrooms": self.bedrooms,
            "bathrooms": self.bathrooms,
            "surface": self.surface,
            "price": self.price,
            "image": self.image,
            "imageLg": self.imageLg,
            "description": self.description,
            "status": self.status,
            "gallery": json.loads(self.gallery) if self.gallery else [],
            "agent": json.loads(self.agent) if self.agent else {}
        }

@app.route('/api/housesData', methods=['GET'])
def get_houses():
    # 1. Capture filters and strip whitespace
    house_type = request.args.get('type', '').strip()
    location = request.args.get('location', '').strip()
    min_price = request.args.get('minPrice')
    max_price = request.args.get('maxPrice')

    # 2. Start base query
    query = Listing.query

    # 3. Apply Filters ONLY if they have meaningful values
    # We check .lower() so 'All', 'all', or 'ALL' are all ignored correctly
    if house_type and house_type.lower() not in ['all', 'any', 'houses']:
        query = query.filter(Listing.type.ilike(f"{house_type}"))

    if location and location.lower() not in ['all', 'any', 'locations']:
        query = query.filter(Listing.location.ilike(f"%{location}%"))

    # Price filters with safety checks to avoid crashes on non-numeric strings
    try:
        if min_price and min_price.isdigit():
            query = query.filter(Listing.price >= int(min_price))
        if max_price and max_price.isdigit():
            query = query.filter(Listing.price <= int(max_price))
    except ValueError:
        pass # Ignore price filtering if values aren't numbers

    listings = query.all()
    return jsonify([h.to_dict() for h in listings])

@app.route('/api/housesData/<int:house_id>', methods=['GET'])
def get_single_house(house_id):
    house = db.session.get(Listing, house_id)
    if not house:
        return jsonify({"error": "Property not found"}), 404
    return jsonify(house.to_dict()), 200

# Signup, Login, POST and DELETE routes remain largely the same...
# (Keep your existing implementations for those below)

@app.route('/api/housesData', methods=['POST'])
def add_house():
    data = request.json
    try:
        new_house = Listing(
            type=data.get('type'),
            location=data.get('location'),
            bedrooms=int(data.get('bedrooms', 0)),
            bathrooms=int(data.get('bathrooms', 0)),
            surface=data.get('surface'),
            price=int(data.get('price', 0)),
            image=data.get('image'),
            imageLg=data.get('imageLg'),
            description=data.get('description'),
            status=data.get('status', 'Available'),
            # Convert dict/list to string for database storage
            gallery=json.dumps(data.get('gallery', [])),
            agent=json.dumps(data.get('agent', {}))
        )
        db.session.add(new_house)
        db.session.commit()
        
        return jsonify(new_house.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/housesData/<int:house_id>', methods=['DELETE'])
def delete_house(house_id):
    house = Listing.query.get(house_id)
    if not house:
        return jsonify({"error": "House not found"}), 404
    
    try:
        db.session.delete(house)
        db.session.commit()
        return jsonify({"message": f"House {house_id} deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    # Use port assigned by Render, default to 5000 for local
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
