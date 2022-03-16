import email
from hashlib import new
import re
# from telnetlib import STATUS
from fastapi import APIRouter, Depends, HTTPException, Response, status 
from sydengroup.models.users import UserModel, UserORM, ShowUserModel
from typing import List
from sqlalchemy.orm import Session
from config import get_db
from fastapi.security import OAuth2PasswordBearer
from sydengroup.models.authentication import get_current_user

#APIRouter creates path operations for user module
router = APIRouter(
    prefix="/users",
    tags=["User"],
    responses={404: {"description": "Not found"}},
) 

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=ShowUserModel)
async def add_user(request: UserModel, db: Session = Depends(get_db)): 
    new_user = UserORM(first_name=request.first_name, last_name=request.last_name, username=request.username, email=request.email, password=UserORM.get_password_hash(request.password)) 
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/detail", status_code=status.HTTP_200_OK, response_model=List[ShowUserModel])
async def read_users(db: Session = Depends(get_db), current_user: UserORM = Depends(get_current_user)):
    users = db.query(UserORM).all()
    return users 

@router.get("/{id}", status_code=status.HTTP_200_OK, response_model=ShowUserModel)
async def profile(id, response: Response, db: Session = Depends(get_db), current_user: UserORM = Depends(get_current_user)):
    profile = db.query(UserORM).filter(UserORM.id == id).first()
    if not profile:
        response.status_code = status.HTTP_404_NOT_FOUND
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {id} not found") 
    return profile

@router.put("/update/{id}", status_code=status.HTTP_200_OK)
async def update_profile(id, request: UserModel, db: Session = Depends(get_db), current_user: UserORM = Depends(get_current_user)):
    profile = db.query(UserORM).filter(UserORM.id == id)
    if not profile.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="profile id {id} not found")
    db.query(UserORM).filter(UserORM.id == id).update(request.dict())
    db.commit()
    return "profile updated"
    
@router.delete("/{user_id}/delete", status_code=status.HTTP_200_OK)
async def delete_profile(user_id: int, db: Session = Depends(get_db), current_user: UserORM = Depends(get_current_user)):
    profile = db.query(UserORM).filter(UserORM.id == user_id)
    if not profile.first(): 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="profile not found")
    db.query(UserORM).filter(UserORM.id == user_id).delete(synchronize_session='evaluate')
    db.commit()
    return {'detail': "deleted"}

