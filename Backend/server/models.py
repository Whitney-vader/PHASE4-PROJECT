from sqlalchemy import create_engine, Column, Integer, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from faker import Faker
from datetime import datetime

Base = declarative_base()
DATABASE_URL = 'sqlite:///realestate.db'
engine = create_engine(DATABASE_URL)

# Initialize session maker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# models
class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True)
    address = Column(String(100), nullable=False)
    city = Column(String(50), nullable=False)
    state = Column(String(2), nullable=False)
    zip_code = Column(String(10), nullable=False)
    price = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    bookings = relationship("Booking", back_populates="property")

    def __repr__(self):
        return f"Property('{self.address}', '{self.city}', '{self.state}', '{self.zip_code}', {self.price})"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(120), nullable=False)
    role = Column(String(20), nullable=False)
    bookings = relationship("Booking", back_populates="user")

    def __repr__(self):
        return f"User('{self.name}', '{self.email}')"

class Agent(Base):
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    phone_number = Column(String(20), nullable=False)
    agency = Column(String(120), nullable=False)

    def __repr__(self):
        return f"Agent('{self.name}', '{self.email}', '{self.phone_number}', '{self.agency}')"

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    property_id = Column(Integer, ForeignKey('properties.id'), nullable=False)
    booking_date = Column(DateTime, nullable=False, default=datetime.utcnow)
    status = Column(String(20), nullable=False)

    user = relationship("User", back_populates="bookings")
    property = relationship("Property", back_populates="bookings")

    def __repr__(self):
        return f"Booking('{self.user_id}', '{self.property_id}', '{self.booking_date}', '{self.status}')"

# Create tables
Base.metadata.create_all(engine)

# Seed the database
def seed_database(session):
    fake = Faker()

    # Seed properties
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

    # Seed users
    for _ in range(5):
        user = User(
            name=fake.name(),
            email=fake.email(),
            password=fake.password(),
            role='customer'
        )
        session.add(user)

    # Seed agents
    for _ in range(3):
        agent = Agent(
            name=fake.name(),
            email=fake.email(),
            phone_number=fake.phone_number(),
            agency=fake.company()
        )
        session.add(agent)

    # Seed bookings
    for _ in range(5):
        booking = Booking(
            user_id=fake.random_int(1, 5),
            property_id=fake.random_int(1, 10),
            booking_date=fake.date_time_this_year(),
            status=fake.random_element(elements=('pending', 'confirmed', 'canceled'))
        )
        session.add(booking)

    # Commit changes to the database
    session.commit()

# Run seeding
with SessionLocal() as session:
    seed_database(session)
