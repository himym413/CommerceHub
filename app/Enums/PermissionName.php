<?php

namespace App\Enums;

enum PermissionName: string
{
    case ViewOrders = 'orders.view';
    case ApproveOrders = 'orders.approve';
    case DispatchOrders = 'orders.dispatch';
    case DeliverOrders = 'orders.deliver';
    case CancelOrders = 'orders.cancel';
    case AdjustInventory = 'inventory.adjust';
    case CreateProducts = 'products.create';
    case UpdateProducts = 'products.update';
    case SetProductsActive = 'products.set_active';
    case ManageCategories = 'categories.manage';
    case SetCustomersActive = 'customers.set_active';
    case CreateStaff = 'staff.create';
    case SetStaffActive = 'staff.set_active';
    case AssignStaffRole = 'staff.assign_role';
    case ManageRoles = 'roles.manage';

    public function label(): string
    {
        return match ($this) {
            self::ViewOrders => 'View orders',
            self::ApproveOrders => 'Approve orders',
            self::DispatchOrders => 'Dispatch orders',
            self::DeliverOrders => 'Mark orders as delivered',
            self::CancelOrders => 'Cancel orders',
            self::AdjustInventory => 'Adjust stock',
            self::CreateProducts => 'Create products',
            self::UpdateProducts => 'Edit products',
            self::SetProductsActive => 'Activate and deactivate products',
            self::ManageCategories => 'Manage categories',
            self::SetCustomersActive => 'Activate and deactivate customers',
            self::CreateStaff => 'Create staff accounts',
            self::SetStaffActive => 'Activate and deactivate staff',
            self::AssignStaffRole => 'Assign staff roles',
            self::ManageRoles => 'Manage roles and permission assignments',
        };
    }
}
