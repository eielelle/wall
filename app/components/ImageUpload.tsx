'use client';

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import Image from 'next/image';


type ImageUploadProps = {
  parentFile: File | null
  submitFile: React.Dispatch<React.SetStateAction<File | null>>
}

export default function ImageUpload({ parentFile, submitFile }: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    if (!parentFile) {
        setFile(null);
        setPreview(null);
    }
  }, [parentFile])

  return (
    <div className="relative w-full h-[250px] mx-auto rounded-lg border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center space-y-4">
      
      {/* Preview overlay */}
      {preview && (
        <div className="absolute top-0 left-0 w-full h-full z-30 rounded-lg overflow-hidden shadow-md">
          <Image
            height={200}
            width={100}
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
          />
          <button
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
            onClick={() => {
              setFile(null);
              setPreview(null);
              submitFile(null);
            }}
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      )}

      {/* Upload area (hidden when preview exists) */}
      {!preview && (
        <>
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-gray-700 hover:text-gray-900 flex flex-col items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m5 8v-8m0 0l4 4m-4-4l-4 4"
              />
            </svg>
            <p className="text-sm text-white">
              Click to add photo{" "}
              <span className="text-xs text-gray-400">
                (JPG, PNG, GIF up to 5MB)
              </span>
            </p>
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const uploaded = e.target.files?.[0] || null;
                if (uploaded && uploaded.size <= 5 * 1024 * 1024) {
                  setFile(uploaded);
                  submitFile(uploaded);
                } else {
                  alert("File too large (max 5MB)");
                }
              }}
            />
          </label>
        </>
      )}
    </div>
  );
}
