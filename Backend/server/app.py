from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///realestate.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)
CORS(app)

engine = None
SessionLocal = None



# from models import Property, User, Agent, Booking
from routes import PropertyList, PropertyDetail, UserList, UserDetail, AgentList, AgentDetail, BookingList, BookingDetail

api.add_resource(PropertyList, '/api/properties')
api.add_resource(PropertyDetail, '/api/properties/<int:id>')

api.add_resource(UserList, '/api/users')
api.add_resource(UserDetail, '/api/users/<int:id>')

api.add_resource(AgentList, '/api/agents')
api.add_resource(AgentDetail, '/api/agents/<int:id>')

api.add_resource(BookingList, '/api/bookings')
api.add_resource(BookingDetail, '/api/bookings/<int:id>')


if __name__ == '__main__':
    app.run(debug=True, port=5001)