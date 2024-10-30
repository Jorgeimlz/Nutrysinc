# backend/users/views.py
from firebase_admin import firestore
from django.http import JsonResponse

db = firestore.client()

def get_user_profile(request, user_id):
    user_ref = db.collection('users').document(user_id)
    user_data = user_ref.get()
    if user_data.exists:
        return JsonResponse(user_data.to_dict())
    else:
        return JsonResponse({'error': 'User not found'}, status=404)
