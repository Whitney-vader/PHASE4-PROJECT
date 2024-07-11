from flask_restful import Resource
from flask import request
from models import db_session, Property, User, Agent, Booking

class PropertyList(Resource):
    def get(self):
        properties = db_session.query(Property).all()
        return [property.__repr__() for property in properties]

    def post(self):
        data = request.get_json()
        new_property = Property(
            address=data['address'],
            city=data['city'],
            state=data['state'],
            zip_code=data['zip_code'],
            price=data['price'],
            description=data.get('description')
        )
        db_session.add(new_property)
        db_session.commit()
        return new_property.__repr__(), 201

class PropertyDetail(Resource):
    def get(self, id):
        property = db_session.query(Property).get_or_404(id)
        return property.__repr__()

    def put(self, id):
        data = request.get_json()
        property = db_session.query(Property).get_or_404(id)
        property.address = data['address']
        property.city = data['city']
        property.state = data['state']
        property.zip_code = data['zip_code']
        property.price = data['price']
        property.description = data.get('description')
        db_session.commit()
        return property.__repr__()

    def delete(self, id):
        property = db_session.query(Property).get_or_404(id)
        db_session.delete(property)
        db_session.commit()
        return '', 204

class UserList(Resource):
    def get(self):
        users = db_session.query(User).all()
        return [user.__repr__() for user in users]

    def post(self):
        data = request.get_json()
        new_user = User(
            name=data['name'],
            email=data['email'],
            password=data['password'],
            role=data['role']
        )
        db_session.add(new_user)
        db_session.commit()
        return new_user.__repr__(), 201

class UserDetail(Resource):
    def get(self, id):
        user = db_session.query(User).get_or_404(id)
        return user.__repr__()

    def put(self, id):
        data = request.get_json()
        user = db_session.query(User).get_or_404(id)
        user.name = data['name']
        user.email = data['email']
        user.password = data['password']
        user.role = data['role']
        db_session.commit()
        return user.__repr__()

    def delete(self, id):
        user = db_session.query(User).get_or_404(id)
        db_session.delete(user)
        db_session.commit()
        return '', 204

class AgentList(Resource):
    def get(self):
        agents = db_session.query(Agent).all()
        return [agent.__repr__() for agent in agents]

    def post(self):
        data = request.get_json()
        new_agent = Agent(
            name=data['name'],
            email=data['email'],
            phone_number=data['phone_number'],
            agency=data['agency']
        )
        db_session.add(new_agent)
        db_session.commit()
        return new_agent.__repr__(), 201

class AgentDetail(Resource):
    def get(self, id):
        agent = db_session.query(Agent).get_or_404(id)
        return agent.__repr__()

    def put(self, id):
        data = request.get_json()
        agent = db_session.query(Agent).get_or_404(id)
        agent.name = data['name']
        agent.email = data['email']
        agent.phone_number = data['phone_number']
        agent.agency = data['agency']
        db_session.commit()
        return agent.__repr__()

    def delete(self, id):
        agent = db_session.query(Agent).get_or_404(id)
        db_session.delete(agent)
        db_session.commit()
        return '', 204

class BookingList(Resource):
    def get(self):
        bookings = db_session.query(Booking).all()
        return [booking.__repr__() for booking in bookings]

    def post(self):
        data = request.get_json()
        new_booking = Booking(
            user_id=data['user_id'],
            property_id=data['property_id'],
            booking_date=data['booking_date'],
            status=data['status']
        )
        db_session.add(new_booking)
        db_session.commit()
        return new_booking.__repr__(), 201

class BookingDetail(Resource):
    def get(self, id):
        booking = db_session.query(Booking).get_or_404(id)
        return booking.__repr__()

    def put(self, id):
        data = request.get_json()
        booking = db_session.query(Booking).get_or_404(id)
        booking.user_id = data['user_id']
        booking.property_id = data['property_id']
        booking.booking_date = data['booking_date']
        booking.status = data['status']
        db_session.commit()
        return booking.__repr__()

    def delete(self, id):
        booking = db_session.query(Booking).get_or_404(id)
        db_session.delete(booking)
        db_session.commit()
        return '', 204
