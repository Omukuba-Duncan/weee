import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface DisposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisposeModal: React.FC<DisposeModalProps> = ({ isOpen, onClose }) => {
  const { addInquiry, startNewEmailThread } = useApp();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'Corporate IT Assets (Laptops, Servers, Monitors)',
    location: 'Nairobi Metropolitan Area',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.type,
      message: `Location: ${formData.location}. Notes: ${formData.notes}`
    });
    startNewEmailThread(
      formData.email,
      formData.name,
      `Pickup Request: ${formData.type}`,
      `Hello WEEE Centre team,\n\nI would like to schedule a pickup for ${formData.type} in ${formData.location}.\n\nAdditional notes: ${formData.notes || 'None'}\n\nPlease let me know the available time slots.`
    );
    setStep('success');
  };

  const resetAndClose = () => {
    setStep('form');
    setFormData({
      name: '',
      phone: '',
      email: '',
      type: 'Corporate IT Assets (Laptops, Servers, Monitors)',
      location: 'Nairobi Metropolitan Area',
      notes: ''
    });
    onClose();
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 1060 }} tabIndex={-1} role="dialog" aria-labelledby="disposeModalTitle" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
          {/* Modal Header */}
          <div className="modal-header bg-dark-green text-white p-4 border-0">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white text-success rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <i className="fa-solid fa-recycle fs-4"></i>
              </div>
              <div>
                <h3 className="modal-title fs-5 fw-bold mb-0 text-white" id="disposeModalTitle">Schedule E-Waste Disposal & Pickup</h3>
                <span className="font-xs text-light-green">NEMA Licensed • ISO 9001:2015 Certified ITAD</span>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={resetAndClose} aria-label="Close"></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-4 p-md-5">
            {step === 'form' ? (
              <form onSubmit={handleSubmit}>
                <p className="text-muted font-sm mb-4">
                  Please fill out the form below to schedule a secure pickup or on-site evaluation. Our logistics team will respond within 24 hours.
                </p>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label font-sm fw-semibold">Full Name / Contact Person *</label>
                    <input 
                      type="text" 
                      required 
                      className="form-control rounded-3 py-2 font-sm" 
                      placeholder="e.g. David Mwangi"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label font-sm fw-semibold">Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      className="form-control rounded-3 py-2 font-sm" 
                      placeholder="+254 700 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label font-sm fw-semibold">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      className="form-control rounded-3 py-2 font-sm" 
                      placeholder="david@company.co.ke"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label font-sm fw-semibold">Location / Town *</label>
                    <select 
                      className="form-select rounded-3 py-2 font-sm"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    >
                      <option value="Nairobi Metropolitan Area">Nairobi Metropolitan Area (Free Evaluation)</option>
                      <option value="Mombassa & Coastal Region">Mombasa & Coastal Region</option>
                      <option value="Kisumu & Western Kenya">Kisumu & Western Kenya</option>
                      <option value="Nakuru & Rift Valley">Nakuru & Rift Valley</option>
                      <option value="Other East Africa Region">Other East Africa Region (Uganda / Tanzania / Rwanda)</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label font-sm fw-semibold">Type of Electronic Equipment *</label>
                    <select 
                      className="form-select rounded-3 py-2 font-sm"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="Corporate IT Assets (Laptops, Servers, Monitors)">Corporate IT Assets (Laptops, Servers, Monitors)</option>
                      <option value="Sensitive Storage for Data Erasure / Shredding">Sensitive Hard Drives / SSDs for Data Shredding</option>
                      <option value="Household Electronics (Phones, Chargers, TVs, Appliances)">Household Electronics (Phones, TVs, Small Appliances)</option>
                      <option value="Solar Equipment (Panels, Lithium Batteries, Inverters)">Solar Equipment (Panels, Batteries, Inverters)</option>
                      <option value="Mixed Electronic Scrap / Obsolete Inventory">Mixed Electronic Scrap / Obsolete Warehouse Inventory</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label font-sm fw-semibold">Estimated Volume / Special Instructions</label>
                    <textarea 
                      className="form-control rounded-3 py-2 font-sm" 
                      rows={3} 
                      placeholder="Specify approximate quantity (e.g., 20 desktop PCs, 15 hard drives) or preferred pickup date..."
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    ></textarea>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                  <button type="button" className="btn btn-outline-secondary rounded-pill px-4 font-sm" onClick={resetAndClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success rounded-pill px-5 py-2 font-sm fw-bold shadow-sm d-flex align-items-center">
                    <i className="fa-solid fa-check me-2"></i> Confirm Disposal Request
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="bg-light-green text-success rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '80px', height: '80px' }}>
                  <i className="fa-solid fa-circle-check fs-1"></i>
                </div>
                <h3 className="fw-bold text-dark-green mb-2">Disposal Request Received!</h3>
                <p className="text-muted max-w-lg mx-auto font-sm mb-4">
                  Thank you, <strong>{formData.name || 'Partner'}</strong>! Your request to recycle <strong>{formData.type}</strong> has been assigned ticket number <strong>#WEEE-{Math.floor(1000 + Math.random() * 9000)}</strong>. Our logistics officer will contact you at <strong>{formData.phone}</strong> shortly.<br /><br />
                  <span className="badge bg-success text-white p-2 font-xs"><i className="fa-solid fa-envelope me-1"></i> We have opened a live email conversation thread for this ticket! Check the floating Email tab at bottom-left.</span>
                </p>
                <div className="p-3 bg-soft-green rounded-3 border border-success border-opacity-25 max-w-md mx-auto mb-4 text-start font-xs text-muted">
                  <div className="fw-bold text-dark-green mb-1"><i className="fa-solid fa-shield-halved text-success me-1"></i> What happens next?</div>
                  <ul className="mb-0 ps-3">
                    <li>Our team reviews your inventory and schedules a convenient pickup window.</li>
                    <li>We dispatch a GPS-tracked collection vehicle with certified handlers.</li>
                    <li>Upon delivery to our facility, we issue an official Certificate of Recycling and Data Erasure.</li>
                  </ul>
                </div>
                <button type="button" className="btn btn-dark-green rounded-pill px-5 py-2 fw-bold shadow" onClick={resetAndClose}>
                  Done & Return to Site
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
