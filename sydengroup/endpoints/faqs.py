from hashlib import new
from fastapi import APIRouter
from fastapi import Depends 
from sydengroup.models.authentication import get_current_user
from sydengroup.models.users import UserORM
from config import get_db
from sqlalchemy.orm import Session
from sydengroup.models.faqs import FAQ, ShowFAQ, AddFAQs


router = APIRouter(
    prefix="/faqs",
    tags=["FAQS"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def faqs(current_user: UserORM = Depends(get_current_user)):
    return [{"detail": "Frequently Asked Questions"}]

@router.post('/add')
async def add_faqs(request: AddFAQs, db: Session = Depends(get_db), current_user: UserORM = Depends(get_current_user)):
    new_faq = FAQ(question=request.question)
    db.add(new_faq)
    db.commit()
    db.refresh(new_faq)
    return new_faq

@router.get("/recent")
async def recent_faqs(current_user: UserORM = Depends(get_current_user)):
    return [{"detail": "Recent FAQs"}]

@router.get("/{id}")
async def my_faqs(id: int, current_user: UserORM = Depends(get_current_user)):
    return [{"detail": "My FAQs"}]




