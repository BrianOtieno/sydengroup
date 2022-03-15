from pydantic import BaseModel
from config import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, ForeignKey, Integer, String
from sydengroup.models.users import ShowUserModel

class FAQ(Base):
    __tablename__ = "faqs"
    id = Column(Integer, primary_key=True, index=True)
    question = Column(String)
    userid = Column(Integer, ForeignKey("users.id"))
    
    user = relationship("UserORM", back_populates="faq")

class AddFAQs(BaseModel):
    question: str  
    
class FAQResponse(BaseModel):
    pass

class ShowFAQ(BaseModel):
    question: str
    creator: ShowUserModel