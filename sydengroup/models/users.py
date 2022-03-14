import email
from faulthandler import disable
# from xmlrpc.client import Boolean
from pydantic import BaseModel, constr,  Field
from sqlalchemy import Column, Integer, String, Boolean
from typing import Optional
from config import Base
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserORM(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    username = Column(String)
    email = Column(String)
    password = Column(String)
    disabled = Column(Boolean(), default=False, nullable=True)
    
    def get_password_hash(password):
        return pwd_context.hash(password)
    
    def verify_password(plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)
    
class UserModel(BaseModel):
    # id: Optional[int] = None
    first_name: str
    last_name: str
    username: str
    email: str
    password: constr(max_length=255)
    disabled: Optional[bool] = None

class ShowUserModel(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: str
    disabled: Optional[bool] = None
    
    class Config():
        orm_mode = True
    

