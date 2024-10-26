from flask import Flask, request, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a secure secret key

# Update username and password
valid_username = "Admin"
valid_password = "AdminHunter"
valid_password_hash = generate_password_hash(valid_password)

@app.route('/authenticate.py', methods=['POST'])
def authenticate():
    if request.method == 'POST':
        input_username = request.form['username']
        input_password = request.form['password']

        if input_username == valid_username and check_password_hash(valid_password_hash, input_password):
            session['authenticated'] = True
            return jsonify(result="success")
        else:
            return jsonify(result="failure")

if __name__ == '__main__':
    app.run(debug=True)