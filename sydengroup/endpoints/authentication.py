from http.client import HTTPException
from fastapi import APIRouter, Depends, HTTPException, status
from sydengroup.models.users import UserORM
from sydengroup.models.authentication import create_access_token
from sqlalchemy.orm import Session
from config import get_db
from datetime import timedelta 
from fastapi.security import OAuth2PasswordRequestForm


 
ACCESS_TOKEN_EXPIRE_MINUTES = 30



router = APIRouter(
    prefix="/authentication",
    tags=["Authentication"],
    responses={404: {"description": "Not found"}},
)

@router.post('/')
async def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(UserORM).filter(UserORM.username == request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials")
    
    if not (UserORM.verify_password(request.password, user.password)):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
    return user
