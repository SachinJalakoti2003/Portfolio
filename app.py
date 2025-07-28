from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mail import Mail, Message
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Flask-Mail config (for demo, not sending real emails)
app.config['MAIL_SERVER'] = 'smtp.example.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'your@email.com'
app.config['MAIL_PASSWORD'] = 'yourpassword'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/certifications')
def certifications():
    # List files in static/certifications
    certs = os.listdir(os.path.join('static', 'certifications'))
    return render_template('certifications.html', certs=certs)

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    # For demo: just flash the message
    flash('Message received! (Demo only)')
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True) 