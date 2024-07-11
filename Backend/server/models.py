from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app import Property

from seed import db  

Base = declarative_base()

class Property(Base):
    __tablename__ = "properties"

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zip_code = db.Column(db.String(10), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f"Property('{self.address}', '{self.city}', '{self.state}', '{self.zip_code}', {self.price})"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)

    def __repr__(self):
        return f"User('{self.name}', '{self.email}')"

# Create the engine and sessionmaker (assuming a database connection string is defined elsewhere)
engine = create_engine('your_database_connection_string')
Base.metadata.create_all(engine)  # Create tables if they don't exist
db = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def seed_database(session):

    from faker import Faker 
    fake = Faker()
    for _ in range(10):
        property = Property(
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state_abbr(),
            zip_code=fake.zipcode(),
            price=fake.random_int(100000, 500000),
            description=fake.paragraph()
        )
        session.add(property)

    for _ in range(5):
        user = User(
            name=fake.name(),
            email=fake.email()
        )
        session.add(user)

    # Commit changes to the database
    session.commit()


seed_database(db())