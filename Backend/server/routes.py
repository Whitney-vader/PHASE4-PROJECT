from flask_restful import Resource, reqparse
from models import Property, User

class PropertyList(Resource):
    def get(self):
        properties = Property.query.all()
        return [{'id': p.id, 'address': p.address, 'city': p.city, 'tate': p.state, 'zip_code': p.zip_code, 'price': p.price} for p in properties]

class PropertyDetail(Resource):
    def get(self, property_id):
        property = Property.query.get(property_id)
        if property is None:
            return {'error': 'Property not found'}, 404
        return {'id': property.id, 'address': property.address, 'city': property.city, 'tate': property.state, 'zip_code': property.zip_code, 'price': property.price}

class UserList(Resource):
    def get(self):
        users = User.query.all()
        return [{'id': u.id, 'name': u.name, 'email': u.email} for u in users]

class UserDetail(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if user is None:
            return {'error': 'User not found'}, 404
        return {'id': user.id, 'name': user.name, 'email': user.email}