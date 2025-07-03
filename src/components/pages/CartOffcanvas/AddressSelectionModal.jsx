import React from 'react'

const AddressSelectionModal = () => {
  return (
     <>
      {isOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" 
          onClick={onClose} 
          style={{ zIndex: 1050 }} 
        />
      )}

      <div 
        className={`position-fixed top-0 h-100 bg-white shadow-lg address-modal ${isOpen ? 'translate-x-0' : 'translate-x-100'}`}
        style={{
          zIndex: 1055,
          right: 0,
          width: '100%',
          maxWidth: '400px',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <div className="h-100 d-flex flex-column">
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom bg-white flex-shrink-0">
            <div className="d-flex align-items-center">
              <button 
                type="button" 
                className="btn btn-link p-0 text-dark me-3" 
                onClick={onClose}
                style={{ fontSize: '1.5rem', textDecoration: 'none' }}
              >
                ←
              </button>
              <h5 className="mb-0 fw-bold">Select delivery address</h5>
            </div>
          </div>

          {/* Add New Address Button */}
          <div className="p-3 border-bottom">
            <button 
              className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center py-2"
              onClick={() => setShowAddressForm(true)}
              style={{ borderRadius: '8px' }}
            >
              <span className="me-2" style={{ fontSize: '1.2rem' }}>+</span>
              Add a new address
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow-1 overflow-auto">
            {loading ? (
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="text-center">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="mt-2 text-muted">Loading addresses...</div>
                </div>
              </div>
            ) : error ? (
              <div className="p-3">
                <div className="alert alert-danger">
                  <strong>Error:</strong> {error}
                  <button 
                    className="btn btn-sm btn-outline-danger mt-2 w-100"
                    onClick={fetchAddresses}
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : addresses.length === 0 ? (
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="text-center text-muted">
                  <div style={{ fontSize: '3rem' }}>📍</div>
                  <h6 className="mt-3">No addresses found</h6>
                  <p className="small">Add your first delivery address</p>
                </div>
              </div>
            ) : (
              <div className="p-3">
                <h6 className="text-muted mb-3 small">Your saved addresses</h6>
                {addresses.map((address) => (
                  <div 
                    key={address.addressId} 
                    className={`border rounded p-3 mb-3 cursor-pointer ${selectedAddressId === address.addressId ? 'border-success bg-light' : 'border-light'}`}
                    onClick={() => handleAddressSelect(address)}
                    style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                  >
                    <div className="d-flex align-items-start">
                      <div className="me-3 flex-shrink-0">
                        <div 
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: selectedAddressId === address.addressId ? '#28a745' : '#f8f9fa',
                            borderRadius: '8px',
                            fontSize: '1.2rem'
                          }}
                        >
                          {selectedAddressId === address.addressId ? (
                            <span style={{ color: 'white' }}>✓</span>
                          ) : (
                            getAddressTypeIcon(address.addressType)
                          )}
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-bold text-capitalize mb-1">
                          {address.addressType || 'Address'}
                        </div>
                        <div className="text-muted small">
                          {formatAddress(address)}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button 
                          className="btn btn-link p-1 text-muted"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle edit address - you can implement this later
                            console.log('Edit address:', address.addressId);
                          }}
                          style={{ fontSize: '0.9rem', textDecoration: 'none' }}
                        >
                          ✏️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {addresses.length > 0 && (
            <div className="p-3 bg-white border-top flex-shrink-0">
              <button 
                className="btn btn-success w-100 py-2 fw-bold"
                onClick={handleConfirmSelection}
                disabled={!selectedAddressId}
                style={{ borderRadius: '8px' }}
              >
                Deliver to this address
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .address-modal {
            width: 100vw !important;
            max-width: 100vw !important;
          }
        }
        
        .cursor-pointer:hover {
          background-color: #f8f9fa !important;
        }
        
        .translate-x-0 {
          transform: translateX(0) !important;
        }
        
        .translate-x-100 {
          transform: translateX(100%) !important;
        }
      `}</style>
    </>
  )
}

export default AddressSelectionModal