from hashlib import new 
from fastapi import APIRouter
from fastapi import Depends, HTTPException, status
from sydengroup.models.authentication import get_current_user
from sydengroup.models.users import UserORM
from config import get_db
from sqlalchemy.orm import Session
from sydengroup.models.faqs import FAQ, FAQResponse, ShowFAQ, AddFAQs


router = APIRouter(
    prefix="/faqs",
    tags=["FAQS"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def faqs(current_user: UserORM = Depends(get_current_user)):
    return [{"username": current_user}]

@router.post('/add')
async def add_faqs(request: AddFAQs, db: Session = Depends(get_db), current_user: UserORM = Depends(get_current_user)):
    new_faq = FAQ(question=request.question, userid=current_user.id)
    if current_user.id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"User Unauthorized!")
    db.add(new_faq)
    db.commit()
    db.refresh(new_faq)
    return new_faq

@router.get("/recent")
async def recent_faqs(current_user: UserORM = Depends(get_current_user), db: Session = Depends(get_db)):
    faqs = db.query(FAQ).limit(5).all()
    return faqs

@router.get("/{id}")
async def my_faqs(id: int, current_user: UserORM = Depends(get_current_user), db: Session = Depends(get_db)):
    if id is not current_user.id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"User Unauthorized!")
    faqs = db.query(FAQ).filter(FAQ.userid == current_user.id).limit(10).all() 
    return faqs