import Admin from "./Admin";

export default function CustomerManager() {

    

    return(
        <>
            <Admin/>
            <div className="admin-content-container">
                <div className="admin-customer-navbar">
                    <div>
                        <input type="text" />
                        <select>
                            <option>All status</option>
                            <option>Delivering</option>
                            <option>Success</option>
                            <option>Cancel</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}