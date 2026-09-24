import '../styles/OrderManegment.css';
import { getDetailedOrders ,getDetaileUnhiddendOrders,hideOrder} from '../services/api.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export function OrderManegment (){
    const [orders,setOrders] = useState([])
    const [selectedTotal,setSelectedTotal] = useState("all")
    const [selectedStatus,setSelectedStatus] = useState("all")
    const [selectedName,setSelectedName] = useState("")
    const [selectedDateSort, setSelectedDateSort] = useState("default");
    const [selectedVisibility,setSelectedVisibility] = useState("all")

useEffect(() => {
    const fetchOrdersBasedOnMode = async () => {
        try {
            const token = localStorage.getItem("token");
            let res;
            if (selectedVisibility === "all") {
                res = await getDetailedOrders(token); 
            } else {
                res = await getDetaileUnhiddendOrders(token);
            }
            setOrders(res.data);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        }
    };

    fetchOrdersBasedOnMode();
}, [selectedVisibility]); 
const handelHidding =async(id) => {
    try{
        const token = localStorage.getItem("token");
        await hideOrder(token,id)
        setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
    }catch(err){
        console.error("Failed to fetch orders", err);
    }
}
const filtredOrders = orders.filter((order) => {

      const matchesStatus = selectedStatus === "all" || order.status?.toLowerCase() === selectedStatus.toLowerCase();

      const matchesName = selectedName.trim() === "" || order.user.name?.toLowerCase().includes(selectedName.toLowerCase());

      const matchVisibility = selectedVisibility === "all" || order.hidden === false;

      let matchTotal = true;
      const total = Number(order.total);

      if (selectedTotal === "under-5000") matchTotal = total <= 5000;
      else if (selectedTotal === "btw-5000-10000") matchTotal = total >= 5000 && total <= 10000;
      else if (selectedTotal === "btw-10000-20000") matchTotal = total >= 10000 && total <= 20000;
      else if (selectedTotal === "btw-20000-50000") matchTotal = total >= 20000 && total <= 50000;
      else if (selectedTotal === "btw-50000-100000") matchTotal = total >= 50000 && total <= 100000;
      else if (selectedTotal === "btw-100000-200000") matchTotal = total >= 100000 && total <= 200000;
      else if (selectedTotal === "btw-200000-500000") matchTotal = total >= 200000 && total <= 500000;
      else if (selectedTotal === "btw-500000-1000000") matchTotal = total >= 500000 && total <= 1000000;
      else if (selectedTotal === "more-1000000") matchTotal = total >= 1000000;

      return matchesStatus && matchVisibility &&matchesName && matchTotal
    })

    .sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime() || 0;
          const dateB = new Date(b.createdAt).getTime() || 0;

          if (selectedDateSort === "old-new") return dateA - dateB; 
          if (selectedDateSort === "new-old") return dateB - dateA; 

          const totalA = Number(a.total) || 0;
          const totalB = Number(b.total) || 0;

          if (selectedTotal === "low-high") return totalA - totalB;
          if (selectedTotal === "high-low") return totalB - totalA;

          return 0;
    });
    return(
        <>
            <div className="search-section">
                <div className="filter-group">
                    <label className="filter-label">Search</label>
                    <input 
                    type="text" 
                    className="filter-input" 
                    placeholder="Search orders by owner name..." 
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <label className="filter-label">Status</label>
                    <select 
                    name="status" 
                    id="status-select" 
                    className="filter-select" 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                    <option value="all">All statuses</option>
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label className="filter-label">Date Order</label>
                    <select 
                    name="dateSort" 
                    id="date-select" 
                    className="filter-select"
                    value={selectedDateSort}
                    onChange={(e) => setSelectedDateSort(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="old-new">Oldest to Newest</option>
                        <option value="new-old">Newest to Oldest</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label className="filter-label">Total</label>
                    <select name="Total" 
                    id="Total-select" 
                    className="filter-select"
                    value={selectedTotal}
                    onChange={(e) => setSelectedTotal(e.target.value)}>
                    <option value="all">All Total</option>
                    <option value="low-high">Total: Low to High</option>
                    <option value="high-low">Total: High to Low</option>
                    <option value="under-5000">5,000 or under -</option>
                    <option value="btw-5000-10000">Between 5,000 - 10,000</option>
                    <option value="btw-10000-20000">Between 10,000 - 20,000</option>
                    <option value="btw-20000-50000">Between 20,000 - 50,000</option>
                    <option value="btw-50000-100000">50,000 - 100,000</option>
                    <option value="btw-100000-200000">100,000 - 200,000</option>
                    <option value="btw-200000-500000">200,000 - 500,000</option>
                    <option value="btw-500000-1000000">500,000 - 1,000,000</option>
                    <option value="more-1000000">More then 1,000,000 </option>
                    </select>
                </div>
                <div className="filter-group">
                    <label className="filter-label">Visibility</label>
                    <select 
                    name="Visibility" 
                    id="Visibility-select" 
                    className="filter-select"
                    value={selectedVisibility}
                    onChange={(e) => setSelectedVisibility(e.target.value)}>
                        <option value="all">All</option>
                        <option value="active">Active orders only</option>
                    </select>
                </div>
            </div>
            {(filtredOrders.length === 0) ? <><h1 className="No-orders">No orders match this filter!</h1></> : 
            <>
                <h1 className="mgnt-title" >Orders</h1>
                <table className="mgnt-table" >
                    <thead>
                        <tr className="mgnt-titles">
                            <td>Status</td>
                            <td>Name</td>
                            <td>Adress</td>
                            <td>Phone</td>
                            <td>Creation</td>
                            <td>Last update</td>
                            <td>Total</td>
                            <td>View</td>
                            {selectedVisibility === "active" && <td>Hide</td>}
                        </tr>
                    </thead>
                    <tbody>
                        
                        {filtredOrders.map( (o) => (
                            <tr key={o._id} className='mgnt-single-order'>
                                <td>
                                    <span className={`status-mgnt-${o.status}`}>
                                        {o.status}
                                    </span>
                                </td>
                                <td>
                                    <span className='mgnt-order-name'>
                                        {o.user?.name}
                                    </span>
                                </td>
                                <td>
                                    <span className='mgnt-order-adress'>
                                        {o.adress}
                                    </span>
                                </td>
                                <td>
                                    <span className='mgnt-order-phone'>
                                        {o.phone}
                                    </span>
                                </td>
                                <td>
                                    <span className='mgnt-order-creation'>
                                        {new Date(o.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true //24h system
                                    })}
                                    </span>
                                </td>
                                <td>
                                    <span className='mgnt-order-modification'>
                                        {new Date(o.updatedAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                    </span>
                                </td>
                                <td>
                                    <span className='mgnt-order-total'>
                                        {o.total.toLocaleString()}
                                    </span>
                                </td>
                                <td>
                                    <span className='mgnt-order-view'>
                                        <Link to={`${o._id}`}>view</Link>
                                    </span>
                                </td>
                                {selectedVisibility === "active" &&<td>
                                    <button className='mgnt-order-delete'
                                    onClick={()=>handelHidding(o._id)}>
                                        ✕
                                    </button>
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>}
        </>
    )
}