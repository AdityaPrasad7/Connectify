import React from 'react';
import Modal from './Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  number: Yup.number()
    .typeError('Phone number must be a number')
    .integer('Phone number must be an integer')
    .required('Phone number is required'),
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact, getContacts }) => {

  const AddConatct = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      getContacts();
      onClose();
      toast.success("Contact added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      getContacts();
      onClose();
      toast.success("Contact updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                name: contact.name || '',
                email: contact.email || '',
                number: contact.number || '',
              }
              : { name: '', email: '', number: '' }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : AddConatct(values);
          }}
        >
          <Form className="flex flex-col gap-5 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              {isUpdate ? 'Update Contact' : 'Add Contact'}
            </h2>

            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-gray-700 font-medium">
                Name
              </label>
              <Field
                name="name"
                placeholder="Enter full name"
                className="h-10 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </label>
              <Field
                name="email"
                placeholder="Enter email address"
                className="h-10 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="number" className="text-gray-700 font-medium">
                Phone Number
              </label>
              <Field
                name="number"
                placeholder="Enter phone number"
                className="h-10 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              />
              <ErrorMessage
                name="number"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200"
              >
                {isUpdate ? 'Update' : 'Add'}
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
