from fastapi import APIRouter
from fastapi import Depends 
from sydengroup.models.authentication import get_current_user
from sydengroup.models.users import UserORM
from sydengroup.models.faqs import FAQ


router = APIRouter(
    prefix="/faqs",
    tags=["FAQS"],
    responses={404: {"description": "Not found"}},
)

@router.post("/")
async def faqs(current_user: UserORM = Depends(get_current_user)):
    return [{"detail": "Frequently Asked Questions"}]

@router.post("/recent")
async def recent_faqs(current_user: UserORM = Depends(get_current_user)):
    return [{"detail": "Recent FAQs"}]

@router.post("/{id}")
async def my_faqs(id: int, current_user: UserORM = Depends(get_current_user)):
    return [{"detail": "My FAQs"}]




