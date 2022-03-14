from fastapi import APIRouter
from sydengroup.endpoints import ai, users, authentication

router = APIRouter()
router.include_router(ai.router)
router.include_router(users.router)
router.include_router(authentication.router)