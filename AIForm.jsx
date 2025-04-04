import { useState } from "react";

export default function FieldBasedFormGenerator() {
  const [fieldList, setFieldList] = useState(""); // User-provided field list
  const [fields, setFields] = useState([]); // Parsed field names to render the form

  // Function to parse and set field names from input
  const generateFormFields = () => {
    if (!fieldList.trim()) {
      alert("Please enter some field names.");
      return;
    }

    const parsedFields = fieldList.split(",").map(f => f.trim()).filter(Boolean); // Clean and parse field names
    setFields(parsedFields);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Live HTML Form Generator</h1>

      {/* Input for list of field names */}
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter field names separated by commas (e.g., name, email, phone)"
        value={fieldList}
        onChange={(e) => setFieldList(e.target.value)}
      />

      {/* Generate form button */}
      <button
        onClick={generateFormFields}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Generate Form
      </button>

      {/* Render actual form based on parsed field names */}
      {fields.length > 0 && (
        <form className="border p-4 rounded bg-gray-100">
          <h2 className="text-lg font-semibold mb-4">Generated Form</h2>

          {fields.map(field => {
            const label = field.charAt(0).toUpperCase() + field.slice(1);

            // Special handling for full UK address block
            if (field.toLowerCase() === "address") {
              return (
                <div key={field} className="mb-6">
                  <label className="block mb-2 font-medium">Address</label>

                  <input type="text" placeholder="Street Address" name="street" className="w-full p-2 border rounded mb-2" />
                  <input type="text" placeholder="City" name="city" className="w-full p-2 border rounded mb-2" />
                  <input type="text" placeholder="County" name="county" className="w-full p-2 border rounded mb-2" />
                  <input type="text" placeholder="Postcode" name="postcode" className="w-full p-2 border rounded" />
                </div>
              );
            }

            // Default input field
            return (
              <div key={field} className="mb-4">
                <label htmlFor={field} className="block mb-1 font-medium">{label}</label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  className="w-full p-2 border rounded"
                />
              </div>
            );
          })}

          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
