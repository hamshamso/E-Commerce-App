import '../styles/OrderManegment.module.css';
export function OrderManegment (){
    return(
        <>
            <h1 className="mgnt-title" >Orders</h1>
            <table className="mgnt-table" style={{ all: 'revert', width: 'auto' }}>
                <tr className="mgnt-titles">
                    <td>Status</td>
                    <td>Name</td>
                    <td>Adress</td>
                    <td>Phone</td>
                    <td>Date</td>
                    <td>Total</td>
                    <td>View</td>
                </tr>
                <tr>
                    <td>

                    </td>
                </tr>
            </table>
        </>
    )
}