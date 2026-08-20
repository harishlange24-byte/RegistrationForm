const API_URL = import.meta.env.VITE_API_BASE_URL;


// REGISTER USER
export async function registerUser(formData) {
    const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}


// ADMIN LOGIN
export async function loginAdmin(email, password) {
    const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}


// GET ALL REGISTRATIONS
export async function getRegistrations(token) {
    const response = await fetch(
        `${API_URL}/api/admin/registrations`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}


// DELETE REGISTRATION
export async function deleteRegistration(id, token) {
    const response = await fetch(
        `${API_URL}/api/admin/registrations/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}