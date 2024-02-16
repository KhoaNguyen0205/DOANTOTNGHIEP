/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Admin from "./Admin";
import { faEyeSlash, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useState } from "react";

export default function Voucher() {

  const [title, setTitle] = useState('');
  const [valueVoucher, setValueVoucher] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [vouchers, SetVouchers] = useState([]);

  async function handleVoucher(ev) {
    ev.preventDefault();
    try {
      await axios.post('/api/add-voucher', {
        title,
        valueVoucher,
        status,
        description
      });
      alert('add voucher successfully');
      setTitle('');
      setValueVoucher('');
      setDescription('');
      setStatus('');
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  }

  useEffect(() => {
    axios.get('/api/voucher').then(response => {
      SetVouchers(response.data);
    });
  }, [vouchers])

  return (
    <>
      <Admin />
      <div className="admin-content-container">
        <div className="admin-voucher-container">
          <div className="list-voucher">
            {vouchers.length > 0 && vouchers
              .map((voucher) => (
                <div key={voucher} className="all-voucher" >
                  <div className="voucher-details">
                    <div className="voucher-percent">
                        <div className="voucher-value">
                          {voucher.valueVoucher}%
                        </div>
                    </div>
                    <div className="voucher-des">
                      <div className="voucher-title">{voucher.title}</div>
                      <div className="">{voucher.description}</div>
                    </div>
                  </div>
                  <div className="all-voucher-btn">
                    <button style={{ color: 'white', backgroundColor: 'green' }}>Edit</button>
                    <button style={{ color: 'white', backgroundColor: 'red' }}>Delete</button>
                  </div>
                </div>
              ))}
          </div>
          <div className="add-voucher">
            <h3>Handle Voucher</h3>
            <form action="">
              Title: <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} required />
              Value: <select onChange={ev => setValueVoucher(ev.target.value)} id="">
                <option value="">Value</option>
                <option value="12">12%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
                <option value="30">30%</option>
                <option value="35">35%</option>
              </select>
              Description: <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} />

              Status: <div className="voucher-status">
                <div>
                  <FontAwesomeIcon icon={faSquareCheck} style={{ color: 'green', height: '20px', width: '20px' }} />
                  <input name="status" type="radio" value='display' onChange={ev => setStatus(ev.target.value)} />
                </div>
                <div>
                  <FontAwesomeIcon icon={faEyeSlash} style={{ color: 'red', height: '20px', width: '20px' }} />
                  <input name="status" type="radio" value='hide' onChange={ev => setStatus(ev.target.value)} />
                </div>
              </div>

              <div className="add-voucher-btn">
                <button style={{ backgroundColor: '#33cc33', color: 'white' }} onClick={handleVoucher} >Add</button>
                <button style={{ backgroundColor: '#5c85d6', color: 'white' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}