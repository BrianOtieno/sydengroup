from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession 
from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URL = "sqlite+aiosqlite:///./sydengroup.db"
SQLALCHEMY_DATABASE_URL = "sqlite:///./sydengroup.db"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
# engine = create_async_engine(SQLALCHEMY_DATABASE_URL, future=True, echo=True)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
# async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

Base = declarative_base()

# async def get_db():
#     db = async_session()
#     try:
#         yield db
#     except Exception as e:
#         print('Error: ' + str(type(e)))
#     finally:
#         await db.close()

def get_db():
    db = SessionLocal()
    try:
        yield db;
    finally:
        db.close()

 
