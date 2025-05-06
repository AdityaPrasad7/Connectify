import './App.css';
import { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import Navbar from './components/Navbar';
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';
import ContactCards from './components/ContactCards';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './components/NotFoundContact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclouse();

  const getContacts = async () => {
    try {
      const contactsRef = collection(db, "contacts");
      const contactsSnapshot = await getDocs(contactsRef);
      const contactsList = contactsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsList);
      setFilteredContacts(contactsList); // initial load
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const filterContact = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = contacts.filter(contact =>
      (contact.name && contact.name.toLowerCase().includes(value)) ||
      (contact.email && contact.email.toLowerCase().includes(value)) ||
      (contact.number && contact.number.toLowerCase().includes(value)) // phone number search
    );

    setFilteredContacts(filtered);
  };

  return (
    <>
      <div>
        <div className="max-w-[370px] mx-auto px-4">
          <Navbar />

          {/* Search and Add Contact */}
          <div className='flex gap-2 my-4'>
            <div className="relative flex flex-grow items-center">
              <FiSearch className='text-2xl absolute ml-2 text-white' />
              <input
                type="text"
                placeholder="Search by name, email or number..."
                className="bg-transparent border border-white rounded-md 
                h-10 flex-grow pl-9 text-white"
                value={searchTerm}
                onChange={filterContact}
              />
            </div>
            <AiFillPlusCircle onClick={onOpen} className='text-4xl cursor-pointer text-white' />
          </div>

          <AddAndUpdateContact
            onClose={onClose}
            isOpen={isOpen}
            getContacts={getContacts}
          />

          {/* Contact List */}
          <div className="space-y-3">
  {(searchTerm ? filteredContacts : contacts).length === 0 ? (
    <NotFoundContact />
  ) : (
    (searchTerm ? filteredContacts : contacts).map((contact) => (
      <ContactCards key={contact.id} contact={contact} getContacts={getContacts} />
    ))
  )}
</div>

        </div>
      </div>

      <ToastContainer position='bottom-center' />
    </>
  );
}

export default App;
