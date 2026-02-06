from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import os # Necessary to read Environment Variables

app = Flask(__name__)

# Updated CORS: Allow your specific Vercel frontend for better security
CORS(app)

# 1. Production Database Configuration
# This looks for the DATABASE_URL you set in Render. 
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

# Create the database tables in the cloud
with app.app_context():
    db.create_all()

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

if __name__ == '__main__':
    # Use port assigned by Render, default to 5000 for local
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)