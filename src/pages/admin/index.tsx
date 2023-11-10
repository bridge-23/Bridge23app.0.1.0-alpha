//..src/admin/index.tsx
import React, {useContext} from 'react';
import { setDoc } from "@junobuild/core-peer";
import { nanoid } from "nanoid";
import {AuthContext} from "../../contexts/AuthContext";
const Admin = () => {
    interface Category {
        id: string;
        name: string;
    }
    const { user } = useContext(AuthContext);

    const categoriesToAdd: Category[] = [
        { name: "Clothing" },
        { name: "Education" },
        { name: "Electronics" },
        { name: "Health" },
        { name: "Home" },
        { name: "Recreation" },
        { name: "Restaurant" },
        { name: "Services" },
        { name: "Transport" },
        { name: "Travel" },
        { name: "Supermarket" },
        { name: "Other" },
        { name: "Gift" },
        { name: "Internet Retail" },
        { name: "Pets" },
        { name: "Investment" },
        { name: "Rewards" },
        { name: "Salary" },
        { name: "Loan" },
        { name: "Borrow" },
    ].map(category => ({ ...category, id: nanoid() })); // Assign a unique nanoid to each category

    // Function to add multiple categories to the datastore
    const addCategories = async (categories: Category[]) => {
        for (const category of categories) {
            try {
                await setDoc<Category>({
                    collection: "Categories",
                    doc: {
                        key: category.id, // Use the nanoid as the unique key for the document
                        data: category,
                    },
                });
            } catch (error) {
                console.error('Error adding category:', category.name, error);
                // Handle errors here (e.g., retry logic, user notification, etc.)
            }
        }
    };

    return (
        <div>
            <button onClick={() => addCategories(categoriesToAdd)}>
                Initialize Categories
            </button>
        </div>
    );
};

export default Admin;
