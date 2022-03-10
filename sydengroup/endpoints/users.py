import email
from hashlib import new
import re
from telnetlib import STATUS
from fastapi import APIRouter, HTTPException, Response
from fastapi import status, Depends
from sydengroup.models.users import UserModel, UserORM
from typing import Optional
from sqlalchemy.orm import Session
from config import get_db#, get_session

#APIRouter creates path operations for user module
router = APIRouter(
    prefix="/users",
    tags=["User"],
    responses={404: {"description": "Not found"}},
) 

@router.get("/detail")
async def read_users(db: Session = Depends(get_db)):
    users = db.query(UserORM).all()
    return users 

@router.post("/add", status_code=status.HTTP_201_CREATED)
async def add_user(request: UserModel, db: Session = Depends(get_db)):
    new_user = UserORM(first_name=request.first_name, last_name=request.last_name, email=request.email, password=request.password) 
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/{id}")
async def profile(id, response: Response, db: Session = Depends(get_db)):
    profile = db.query(UserORM).filter(UserORM.id == id).first()
    if not profile:
        response.status_code = status.HTTP_404_NOT_FOUND
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {id} not found") 
    return profile

@router.put("/update/{id}")
async def update_profile(id, request: UserModel, db: Session = Depends(get_db)):
    profile = db.query(UserORM).filter(UserORM.id == id)
    if not profile.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="profile id {id} not found")
    db.query(UserORM).filter(UserORM.id == id).update(request.dict())
    db.commit()
    return "profile updated"
    
@router.delete("/{user_id}/delete", status_code=status.HTTP_200_OK)
async def delete_profile(user_id: int, db: Session = Depends(get_db)):
    db.query(UserORM).filter(UserORM.id == user_id).delete(synchronize_session='evaluate')
    if db.commit(): 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="profile not found") 
    return {'detail': "deleted"}
    
