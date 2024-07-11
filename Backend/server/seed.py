from sqlalchemy.orm import sessionmaker
from models import Property, User, db
from faker import Faker

fake = Faker()


def seed_properties():
    session = sessionmaker(bind=db.engine)()  # Create a new session

    try:
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
        session.commit()
    finally:
        session.close()


def seed_users():
    for _ in range(5):
        user = User(
            name=fake.name(),
            email=fake.email()
        )
        db.session.add(user)
    db.session.commit()


if __name__ == '__main__':
    seed_properties()
    seed_users()