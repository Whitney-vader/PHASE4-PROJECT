from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models import Base, Property, User, Agent, Booking
from faker import Faker
from datetime import datetime

# Configure the database
DATABASE_URL = 'sqlite:///realestate.db'  # Update this with your database URL
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the database tables
Base.metadata.create_all(engine)

def seed_database(session):
    fake = Faker()

    # Seed Properties
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

    # Seed Users
    for _ in range(5):
        user = User(
            name=fake.name(),
            email=fake.email(),
            password=fake.password(),
            role=fake.random_element(elements=('customer', 'admin'))
        )
        session.add(user)

    # Seed Agents
    for _ in range(3):
        agent = Agent(
            name=fake.name(),
            email=fake.email(),
            phone_number=fake.phone_number(),
            agency=fake.company()
        )
        session.add(agent)

    # Seed Bookings
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

# Seed the database
if __name__ == "__main__":
    with SessionLocal() as session:
        seed_database(session)
