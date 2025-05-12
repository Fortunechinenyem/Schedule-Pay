"use client";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker({
  selected,
  onChange,
}: {
  selected: Date;
  onChange: (date: Date) => void;
}) {
  return (
    <div className="[&_.react-datepicker-wrapper]:w-full">
      <ReactDatePicker
        selected={selected}
        // onChange={onChange}
        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2"
        dateFormat="MMMM d, yyyy"
      />
    </div>
  );
}
