import { useState, useEffect } from "react";
import Input from "./Input";
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
}

export default function EditableField({ label, value, onSave }: EditableFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  // keep draft in sync if value changes externally
  useEffect(() => {
    setDraft(value);
  }, [value]);

  const handleSave = () => {
    onSave(draft);
    setEditing(false);
  };

  return (
    <div className="flex gap-4 items-center">
      <strong className="w-28 text-gray-700">{label}:</strong>
      {editing ? (
        <div className="flex items-center gap-2 flex-1">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="flex-1"
          />
          <button
            onClick={handleSave}
            className="p-1 rounded-md hover:bg-green-100"
          >
            <CheckIcon className="h-5 w-5 text-green-600" />
          </button>
          <button
            onClick={() => {
              setDraft(value);
              setEditing(false);
            }}
            className="p-1 rounded-md hover:bg-red-100"
          >
            <XMarkIcon className="h-5 w-5 text-red-600" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between flex-1">
          <span className="text-gray-900">{value}</span>
          <button
            onClick={() => setEditing(true)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <PencilIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
}
