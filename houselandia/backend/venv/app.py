from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# 1. Database Configuration
# This creates a file named 'database.db' in your project folder
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# 2. User Model (The Database Table)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

# Create the database file
with app.app_context():
    db.create_all()

# 3. Signup Route
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_pw)
    
    db.session.add(new_user)
    db.session.commit()

    return {"message": "User created successfully"}, 201

# 4. Login Route
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get('email')).first()

    if user and bcrypt.check_password_hash(user.password, data.get('password')):
        return jsonify({"message": "Login successful", "email": user.email}), 200
    
    return {"error": "Invalid email or password"}, 401

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"status": "Server is up and running!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)