import email
from pydantic import BaseModel, constr,  Field
from sqlalchemy import Column, Integer, String
from typing import Optional
from config import Base


class UserORM(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    password = Column(String)
    
class UserModel(BaseModel):
    # id: Optional[int] = None
    first_name: str
    last_name: str
    email: str
    password: constr(max_length=255)

class ShowUserModel(BaseModel):
    first_name: str
    last_name: str
    email: str 
    password: str
    class Config():
        orm_mode = True
    

