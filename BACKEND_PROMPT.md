# Backend Implementation Prompt for Zelle-Based Subscription System

**IMPORTANT**: Copy and paste this entire prompt into GitHub Copilot in your backend repository to build the subscription system.

---

## PROMPT START

I need you to implement a complete **Zelle-based** freemium subscription system for my **existing** Flask backend. This is a manual payment verification system where:
1. Users submit payment requests after sending money via Zelle
2. Admins verify payments and approve/reject subscription requests
3. No automatic payment processing - all verification is manual

The system must integrate with my **existing database** and **existing authentication/login system**. Do NOT create a new database or new user system - work with what already exists.

---

## CRITICAL: EXISTING SYSTEM INTEGRATION

### Your Backend Already Has:

1. **SQLAlchemy Database** (`db` instance from `__init__.py` or similar)
2. **User Model** (`User` class in your models folder) with fields like:
   - `id` (primary key)
   - `uid` (GitHub ID / username)
   - `name`
   - `password` (hashed)
   - `role` (including 'Admin' for administrators)
3. **Authentication System** that:
   - Uses JWT tokens stored in HTTP-only cookies
   - Has `@token_required` decorator for protected routes
   - Sets `g.current_user` with the authenticated user
   - Endpoints: `POST /api/authenticate` for login, `GET /api/user` for getting current user

### YOU MUST:

1. **Find and use the existing `db` instance** - Look for `db = SQLAlchemy(app)` in your `__init__.py` or main app file
2. **Find and use the existing `User` model** - Import it from wherever it's defined
3. **Use the existing `@token_required` decorator** - Import it from your auth module
4. **Use `g.current_user`** to access the authenticated user in protected routes
5. **Add foreign keys that reference the existing `users` table**

### FIRST, EXPLORE THE EXISTING CODEBASE:

```bash
# Find the database instance
grep -r "SQLAlchemy" --include="*.py" .

# Find the User model
grep -r "class User" --include="*.py" .

# Find authentication decorators
grep -r "token_required" --include="*.py" .

# Find existing API routes pattern
grep -r "@app.route\|@.*_bp.route" --include="*.py" .
```

---

## Overview

Build a Zelle-based subscription system with three tiers:
- **Free**: Default tier for all users (no payment required)
- **Plus**: $4.99/month or $47.88/year (20% discount)
- **Pro**: $9.99/month or $95.88/year (20% discount)

**Payment Flow:**
1. User selects a plan and clicks "Upgrade"
2. User sees Zelle payment instructions (phone: 858-205-9428, email: ahaanvk@gmail.com)
3. User sends payment via their bank's Zelle
4. User confirms payment on the website (submits request)
5. Request goes to "pending" status
6. Admin reviews pending requests and approves/rejects
7. Once approved, user gets access to premium features

**Admin users** (where `user.role == 'Admin'`) automatically have full access to ALL features without needing a subscription.

---

## Database Models

Create `model/subscription.py`:

```python
"""
Subscription models for Zelle-based payment system.
Integrates with EXISTING User model and database.
"""
from datetime import datetime
from __init__ import db  # USE YOUR EXISTING db instance - adjust import path

class Subscription(db.Model):
    """
    Subscription model - links to existing User model.
    Tracks subscription tier and status.
    """
    __tablename__ = 'subscriptions'
    
    id = db.Column(db.Integer, primary_key=True)
    
    # Foreign key to existing users table - adjust table name if needed
    _user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    
    # Subscription info
    _tier = db.Column('tier', db.String(20), default='free')  # 'free', 'plus', 'pro'
    _status = db.Column('status', db.String(20), default='active')  # 'active', 'pending', 'cancelled', 'rejected'
    _billing_interval = db.Column('billing_interval', db.String(20))  # 'monthly', 'yearly'
    
    # Timestamps
    _created_at = db.Column('created_at', db.DateTime, default=datetime.utcnow)
    _updated_at = db.Column('updated_at', db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    _expires_at = db.Column('expires_at', db.DateTime)  # When subscription expires
    
    # Relationship
    # user = db.relationship('User', backref=db.backref('subscription', uselist=False))
    
    def __init__(self, user_id, tier='free', status='active', billing_interval=None):
        self._user_id = user_id
        self._tier = tier
        self._status = status
        self._billing_interval = billing_interval
    
    @property
    def user_id(self):
        return self._user_id
    
    @property
    def tier(self):
        return self._tier
    
    @tier.setter
    def tier(self, value):
        if value in ['free', 'plus', 'pro']:
            self._tier = value
    
    @property
    def status(self):
        return self._status
    
    @status.setter
    def status(self, value):
        self._status = value
    
    @property
    def billing_interval(self):
        return self._billing_interval
    
    @billing_interval.setter
    def billing_interval(self, value):
        self._billing_interval = value
    
    @property
    def expires_at(self):
        return self._expires_at
    
    @expires_at.setter
    def expires_at(self, value):
        self._expires_at = value
    
    def read(self):
        """Return subscription data as dictionary."""
        return {
            'id': self.id,
            'user_id': self._user_id,
            'tier': self._tier,
            'status': self._status,
            'billing_interval': self._billing_interval,
            'expires_at': self._expires_at.isoformat() if self._expires_at else None,
            'created_at': self._created_at.isoformat() if self._created_at else None
        }
    
    def create(self):
        db.session.add(self)
        db.session.commit()
        return self
    
    def update(self):
        db.session.commit()
        return self
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()


class SubscriptionRequest(db.Model):
    """
    Tracks pending subscription requests awaiting admin approval.
    """
    __tablename__ = 'subscription_requests'
    
    id = db.Column(db.Integer, primary_key=True)
    
    # Foreign key to existing users table
    _user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Request details
    _plan = db.Column('plan', db.String(20), nullable=False)  # 'plus', 'pro'
    _billing_interval = db.Column('billing_interval', db.String(20), default='monthly')
    _amount = db.Column('amount', db.Float, nullable=False)
    
    # Zelle payment info
    _zelle_name = db.Column('zelle_name', db.String(100))
    _email = db.Column('email', db.String(100))
    
    # Status: 'pending', 'approved', 'rejected'
    _status = db.Column('status', db.String(20), default='pending')
    _rejection_reason = db.Column('rejection_reason', db.String(500))
    
    # Admin who processed the request
    _processed_by = db.Column('processed_by', db.Integer, db.ForeignKey('users.id'))
    _processed_at = db.Column('processed_at', db.DateTime)
    
    # Timestamps
    _created_at = db.Column('created_at', db.DateTime, default=datetime.utcnow)
    
    def __init__(self, user_id, plan, billing_interval, amount, zelle_name=None, email=None):
        self._user_id = user_id
        self._plan = plan
        self._billing_interval = billing_interval
        self._amount = amount
        self._zelle_name = zelle_name
        self._email = email
        self._status = 'pending'
    
    @property
    def user_id(self):
        return self._user_id
    
    @property
    def plan(self):
        return self._plan
    
    @property
    def billing_interval(self):
        return self._billing_interval
    
    @property
    def amount(self):
        return self._amount
    
    @property
    def zelle_name(self):
        return self._zelle_name
    
    @property
    def email(self):
        return self._email
    
    @property
    def status(self):
        return self._status
    
    @status.setter
    def status(self, value):
        self._status = value
    
    @property
    def rejection_reason(self):
        return self._rejection_reason
    
    @rejection_reason.setter
    def rejection_reason(self, value):
        self._rejection_reason = value
    
    def read(self):
        """Return request data as dictionary."""
        # Get username from User model
        from model.users import User  # Adjust import path
        user = User.query.get(self._user_id)
        
        return {
            'id': self.id,
            'user_id': self._user_id,
            'username': user.uid if user else 'Unknown',
            'name': user.name if user else 'Unknown',
            'email': self._email,
            'plan': self._plan,
            'billing_interval': self._billing_interval,
            'amount': self._amount,
            'zelle_name': self._zelle_name,
            'status': self._status,
            'rejection_reason': self._rejection_reason,
            'created_at': self._created_at.strftime('%Y-%m-%d %H:%M') if self._created_at else None
        }
    
    def create(self):
        db.session.add(self)
        db.session.commit()
        return self
    
    def update(self):
        db.session.commit()
        return self


class PaymentHistory(db.Model):
    """Payment history - tracks all subscription payments."""
    __tablename__ = 'payment_history'
    
    id = db.Column(db.Integer, primary_key=True)
    _user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False)
    _subscription_id = db.Column('subscription_id', db.Integer, db.ForeignKey('subscriptions.id'))
    _request_id = db.Column('request_id', db.Integer, db.ForeignKey('subscription_requests.id'))
    
    _amount = db.Column('amount', db.Integer)  # Amount in cents
    _status = db.Column('status', db.String(20))  # 'paid', 'pending', 'rejected'
    _description = db.Column('description', db.String(200))
    _payment_method = db.Column('payment_method', db.String(50), default='zelle')
    
    _created_at = db.Column('created_at', db.DateTime, default=datetime.utcnow)
    
    def __init__(self, user_id, amount, status, description):
        self._user_id = user_id
        self._amount = amount
        self._status = status
        self._description = description
    
    def read(self):
        return {
            'id': self.id,
            'date': self._created_at.strftime('%Y-%m-%d') if self._created_at else None,
            'amount': self._amount,
            'status': self._status,
            'description': self._description
        }
    
    def create(self):
        db.session.add(self)
        db.session.commit()
        return self


def initSubscriptions():
    """Initialize subscription tables. Call after db.create_all()"""
    db.create_all()
    print("Subscription tables initialized")
```

---

## API Endpoints

Create `api/subscription.py`:

```python
"""
Subscription API endpoints for Zelle-based payment system.
"""
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify, g
from flask_restful import Api, Resource
from functools import wraps

# IMPORTANT: Adjust these imports to match YOUR project structure
from __init__ import db
from model.subscription import Subscription, SubscriptionRequest, PaymentHistory
from model.users import User
from api.jwt_authorize import token_required  # Your existing auth decorator

subscription_api = Blueprint('subscription_api', __name__, url_prefix='/api')
api = Api(subscription_api)


# =============================================================================
# UTILITY FUNCTIONS
# =============================================================================

def get_user_tier(user):
    """Get subscription tier for a user. Admins get 'admin' tier."""
    if hasattr(user, 'role') and user.role == 'Admin':
        return 'admin'
    
    subscription = Subscription.query.filter_by(_user_id=user.id).first()
    
    if not subscription:
        return 'free'
    
    if subscription.status not in ['active']:
        return 'free'
    
    return subscription.tier or 'free'


def require_tier(min_tier):
    """Decorator to require minimum subscription tier."""
    tier_levels = {'free': 0, 'plus': 1, 'pro': 2, 'admin': 3}
    
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_tier = get_user_tier(g.current_user)
            user_level = tier_levels.get(user_tier, 0)
            required_level = tier_levels.get(min_tier, 0)
            
            if user_level < required_level:
                return jsonify({
                    'error': 'Subscription required',
                    'message': f'This feature requires {min_tier} tier or higher',
                    'required_tier': min_tier,
                    'current_tier': user_tier
                }), 403
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator


def require_admin():
    """Decorator to require admin role."""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not hasattr(g.current_user, 'role') or g.current_user.role != 'Admin':
                return jsonify({'error': 'Admin access required'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator


# =============================================================================
# USER ENDPOINTS
# =============================================================================

class SubscriptionStatus(Resource):
    """Get current user's subscription status."""
    
    @token_required()
    def get(self):
        user = g.current_user
        
        # Admin check
        if hasattr(user, 'role') and user.role == 'Admin':
            return {
                'tier': 'admin',
                'status': 'active',
                'message': 'Admin users have full access'
            }
        
        # Check for pending request
        pending_request = SubscriptionRequest.query.filter_by(
            _user_id=user.id,
            _status='pending'
        ).first()
        
        if pending_request:
            return {
                'tier': 'free',
                'status': 'pending',
                'requested_tier': pending_request.plan,
                'pending_amount': pending_request.amount,
                'request_date': pending_request._created_at.strftime('%Y-%m-%d') if pending_request._created_at else None,
                'message': 'Payment pending verification'
            }
        
        # Check subscription
        subscription = Subscription.query.filter_by(_user_id=user.id).first()
        
        if not subscription or subscription.tier == 'free':
            return {
                'tier': 'free',
                'status': 'active'
            }
        
        return subscription.read()


class SubscriptionRequestEndpoint(Resource):
    """Submit a subscription request after Zelle payment."""
    
    @token_required()
    def post(self):
        user = g.current_user
        data = request.get_json()
        
        plan = data.get('plan')
        billing_interval = data.get('billing_interval', 'monthly')
        zelle_name = data.get('zelle_name')
        email = data.get('email')
        amount = data.get('amount')
        
        # Validation
        if plan not in ['plus', 'pro']:
            return {'error': 'Invalid plan. Must be "plus" or "pro"'}, 400
        
        if billing_interval not in ['monthly', 'yearly']:
            return {'error': 'Invalid billing interval'}, 400
        
        if not amount:
            return {'error': 'Amount is required'}, 400
        
        # Check for existing pending request
        existing = SubscriptionRequest.query.filter_by(
            _user_id=user.id,
            _status='pending'
        ).first()
        
        if existing:
            return {'error': 'You already have a pending request'}, 400
        
        # Create request
        sub_request = SubscriptionRequest(
            user_id=user.id,
            plan=plan,
            billing_interval=billing_interval,
            amount=amount,
            zelle_name=zelle_name,
            email=email
        )
        sub_request.create()
        
        # Create payment history entry
        payment = PaymentHistory(
            user_id=user.id,
            amount=int(amount * 100),  # Convert to cents
            status='pending',
            description=f'{plan.capitalize()} Plan - {billing_interval}'
        )
        payment._request_id = sub_request.id
        payment.create()
        
        return {
            'success': True,
            'message': 'Request submitted. Your payment will be verified within 24 hours.',
            'request_id': sub_request.id
        }


class CancelSubscription(Resource):
    """Cancel user's subscription."""
    
    @token_required()
    def post(self):
        user = g.current_user
        subscription = Subscription.query.filter_by(_user_id=user.id).first()
        
        if not subscription or subscription.tier == 'free':
            return {'error': 'No active subscription to cancel'}, 404
        
        subscription.status = 'cancelled'
        subscription.tier = 'free'
        subscription.update()
        
        return {
            'success': True,
            'message': 'Subscription cancelled'
        }


class PaymentHistoryEndpoint(Resource):
    """Get payment history for user."""
    
    @token_required()
    def get(self):
        user = g.current_user
        
        payments = PaymentHistory.query.filter_by(_user_id=user.id).order_by(
            PaymentHistory._created_at.desc()
        ).limit(20).all()
        
        return [p.read() for p in payments]


# =============================================================================
# ADMIN ENDPOINTS
# =============================================================================

class AdminPendingRequests(Resource):
    """Get all pending subscription requests (Admin only)."""
    
    @token_required()
    @require_admin()
    def get(self):
        requests = SubscriptionRequest.query.filter_by(_status='pending').order_by(
            SubscriptionRequest._created_at.desc()
        ).all()
        
        return [r.read() for r in requests]


class AdminActiveSubscriptions(Resource):
    """Get all active subscriptions (Admin only)."""
    
    @token_required()
    @require_admin()
    def get(self):
        subscriptions = Subscription.query.filter(
            Subscription._tier.in_(['plus', 'pro']),
            Subscription._status == 'active'
        ).all()
        
        result = []
        for sub in subscriptions:
            user = User.query.get(sub.user_id)
            result.append({
                **sub.read(),
                'username': user.uid if user else 'Unknown',
                'email': getattr(user, 'email', None),
                'start_date': sub._created_at.strftime('%Y-%m-%d') if sub._created_at else None
            })
        
        return result


class AdminAllUsers(Resource):
    """Get all users with subscription info (Admin only)."""
    
    @token_required()
    @require_admin()
    def get(self):
        users = User.query.all()
        
        result = []
        for user in users:
            subscription = Subscription.query.filter_by(_user_id=user.id).first()
            result.append({
                'id': user.id,
                'username': user.uid,
                'name': user.name,
                'email': getattr(user, 'email', None),
                'role': user.role,
                'tier': subscription.tier if subscription else 'free',
                'status': subscription.status if subscription else 'active'
            })
        
        return result


class AdminApproveRequest(Resource):
    """Approve a subscription request (Admin only)."""
    
    @token_required()
    @require_admin()
    def post(self):
        data = request.get_json()
        request_id = data.get('request_id')
        
        if not request_id:
            return {'error': 'request_id is required'}, 400
        
        sub_request = SubscriptionRequest.query.get(request_id)
        
        if not sub_request:
            return {'error': 'Request not found'}, 404
        
        if sub_request.status != 'pending':
            return {'error': 'Request is not pending'}, 400
        
        # Update request status
        sub_request.status = 'approved'
        sub_request._processed_by = g.current_user.id
        sub_request._processed_at = datetime.utcnow()
        sub_request.update()
        
        # Create or update subscription
        subscription = Subscription.query.filter_by(_user_id=sub_request.user_id).first()
        
        if not subscription:
            subscription = Subscription(
                user_id=sub_request.user_id,
                tier=sub_request.plan,
                status='active',
                billing_interval=sub_request.billing_interval
            )
            db.session.add(subscription)
        else:
            subscription.tier = sub_request.plan
            subscription.status = 'active'
            subscription.billing_interval = sub_request.billing_interval
        
        # Set expiration date
        if sub_request.billing_interval == 'yearly':
            subscription.expires_at = datetime.utcnow() + timedelta(days=365)
        else:
            subscription.expires_at = datetime.utcnow() + timedelta(days=30)
        
        db.session.commit()
        
        # Update payment history
        payment = PaymentHistory.query.filter_by(_request_id=request_id).first()
        if payment:
            payment._status = 'paid'
            payment._subscription_id = subscription.id
            db.session.commit()
        
        return {
            'success': True,
            'message': f'Approved {sub_request.plan} subscription for user'
        }


class AdminRejectRequest(Resource):
    """Reject a subscription request (Admin only)."""
    
    @token_required()
    @require_admin()
    def post(self):
        data = request.get_json()
        request_id = data.get('request_id')
        reason = data.get('reason', 'Payment not verified')
        
        if not request_id:
            return {'error': 'request_id is required'}, 400
        
        sub_request = SubscriptionRequest.query.get(request_id)
        
        if not sub_request:
            return {'error': 'Request not found'}, 404
        
        if sub_request.status != 'pending':
            return {'error': 'Request is not pending'}, 400
        
        # Update request status
        sub_request.status = 'rejected'
        sub_request.rejection_reason = reason
        sub_request._processed_by = g.current_user.id
        sub_request._processed_at = datetime.utcnow()
        sub_request.update()
        
        # Update payment history
        payment = PaymentHistory.query.filter_by(_request_id=request_id).first()
        if payment:
            payment._status = 'rejected'
            db.session.commit()
        
        return {
            'success': True,
            'message': 'Request rejected'
        }


class AdminSetSubscription(Resource):
    """Manually set a user's subscription (Admin only)."""
    
    @token_required()
    @require_admin()
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        tier = data.get('tier', 'free')
        billing_interval = data.get('billing_interval', 'monthly')
        
        if not user_id:
            return {'error': 'user_id is required'}, 400
        
        if tier not in ['free', 'plus', 'pro']:
            return {'error': 'Invalid tier'}, 400
        
        # Get or create subscription
        subscription = Subscription.query.filter_by(_user_id=user_id).first()
        
        if not subscription:
            subscription = Subscription(
                user_id=user_id,
                tier=tier,
                status='active',
                billing_interval=billing_interval
            )
            db.session.add(subscription)
        else:
            subscription.tier = tier
            subscription.status = 'active' if tier != 'free' else 'active'
            subscription.billing_interval = billing_interval
        
        # Set expiration for paid tiers
        if tier != 'free':
            if billing_interval == 'yearly':
                subscription.expires_at = datetime.utcnow() + timedelta(days=365)
            else:
                subscription.expires_at = datetime.utcnow() + timedelta(days=30)
        
        db.session.commit()
        
        return {
            'success': True,
            'message': f'Subscription updated to {tier}'
        }


# =============================================================================
# REGISTER ROUTES
# =============================================================================

# User endpoints
api.add_resource(SubscriptionStatus, '/subscription')
api.add_resource(SubscriptionRequestEndpoint, '/subscription/request')
api.add_resource(CancelSubscription, '/subscription/cancel')
api.add_resource(PaymentHistoryEndpoint, '/subscription/history')

# Admin endpoints
api.add_resource(AdminPendingRequests, '/admin/subscriptions/pending')
api.add_resource(AdminActiveSubscriptions, '/admin/subscriptions/active')
api.add_resource(AdminAllUsers, '/admin/users')
api.add_resource(AdminApproveRequest, '/admin/subscriptions/approve')
api.add_resource(AdminRejectRequest, '/admin/subscriptions/reject')
api.add_resource(AdminSetSubscription, '/admin/subscriptions/set')
```

---

## Register Blueprint

In your `main.py` or `__init__.py`:

```python
# Import and register the subscription blueprint
from api.subscription import subscription_api

app.register_blueprint(subscription_api)

# Initialize subscription tables (add to your existing db.create_all() section)
from model.subscription import initSubscriptions
with app.app_context():
    initSubscriptions()
```

---

## CORS Configuration (Fix 401 Errors)

Make sure CORS allows credentials:

```python
from flask_cors import CORS

CORS(app, 
     supports_credentials=True,
     origins=[
         'http://localhost:4887',
         'http://localhost:4100',
         'http://127.0.0.1:4887',
         'http://127.0.0.1:4100',
         'https://ahaanv19.github.io'
     ],
     allow_headers=['Content-Type', 'Authorization', 'X-Origin'],
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
```

---

## Apply Tier Restrictions to Existing Endpoints

Use the `require_tier` decorator on your existing endpoints:

```python
from api.subscription import require_tier, get_user_tier

# Example: Daily routines (Plus+ required)
@app.route('/api/routines', methods=['POST'])
@token_required()
@require_tier('plus')
def create_routine():
    # Only Plus, Pro, or Admin users can access
    pass

# Example: Saved locations with limit checking
@app.route('/api/saved_locations', methods=['POST'])
@token_required()
@require_tier('plus')
def add_saved_location():
    user = g.current_user
    user_tier = get_user_tier(user)
    
    # Plus users limited to 10 locations
    if user_tier == 'plus':
        from model.saved_locations import SavedLocation
        count = SavedLocation.query.filter_by(user_id=user.id).count()
        if count >= 10:
            return jsonify({
                'error': 'Limit reached',
                'message': 'Plus plan allows 10 saved locations. Upgrade to Pro for unlimited.'
            }), 403
    
    # ... rest of logic

# Example: AI predictions (Pro only)
@app.route('/api/predictions', methods=['GET'])
@token_required()
@require_tier('pro')
def get_predictions():
    # Only Pro or Admin users
    pass
```

---

## PROMPT END

---

## COMPLETE API ENDPOINT REFERENCE

### User Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/subscription` | Get user's subscription status | Yes |
| POST | `/api/subscription/request` | Submit payment request | Yes |
| POST | `/api/subscription/cancel` | Cancel subscription | Yes |
| GET | `/api/subscription/history` | Get payment history | Yes |

### Admin Endpoints (require Admin role)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/subscriptions/pending` | Get pending requests | Admin |
| GET | `/api/admin/subscriptions/active` | Get active subscriptions | Admin |
| GET | `/api/admin/users` | Get all users | Admin |
| POST | `/api/admin/subscriptions/approve` | Approve request | Admin |
| POST | `/api/admin/subscriptions/reject` | Reject request | Admin |
| POST | `/api/admin/subscriptions/set` | Manually set subscription | Admin |

---

## Zelle Payment Info

Users will be instructed to send payments to:
- **Phone**: 858-205-9428
- **Email**: ahaanvk@gmail.com

They must include their username in the memo.

---

## Summary

This system:
1. Uses **Zelle for manual payments** - no Stripe required
2. **Admin approval workflow** - you manually verify payments
3. **Integrates with existing database** and auth system
4. **Admin bypass** - users with `role='Admin'` get full access
5. **Pending status** - users see "pending" until you approve
