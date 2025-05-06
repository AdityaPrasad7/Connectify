import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { CiEdit } from "react-icons/ci";
import { FaRegUserCircle, FaTrashAlt } from "react-icons/fa";
import { db } from "../config/firebase";
import AddAndUpdateContact from './AddAndUpdateContact';
import useDisclouse from '../hooks/useDisclouse';
import { toast } from 'react-toastify';

const ContactCards = ({ contact, getContacts }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted");
      getContacts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="bg-white/60 flex justify-between items-center p-3 rounded shadow"
      >
        <FaRegUserCircle className="text-orange-700 text-3xl" />
        <div className="flex-1 ml-3">
          <h2 className="font-semibold">{contact.name}</h2>
          <p className="text-sm">{contact.email}</p>
          <p className="text-sm">{contact.number}</p> {/* Added phone number */}
        </div>
        <CiEdit
          onClick={onOpen}
          className="text-black text-2xl cursor-pointer mx-1"
        />
        <FaTrashAlt
          onClick={() => deleteContact(contact.id)}
          className="text-orange-600 text-xl cursor-pointer mx-1"
        />
      </div>

      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
        getContacts={getContacts}
      />
    </>
  );
};

export default ContactCards;
