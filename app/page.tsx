/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Upload, X } from "lucide-react";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "pt", name: "Portuguese" },
];

const models = [
  {
    value: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
    label: "Llama 3.2 11B",
  },
  {
    value: "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
    label: "Llama 3.2 90B",
  },
];

export default function Page() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<
    { language: string; description: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState(models[0].value);

  const { uploadToS3 } = useS3Upload();

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const { url } = await uploadToS3(file);
    console.log("Successfully uploaded to S3!", url);
    setImage(url);
  };
  const handleSubmit = async () => {
    if (!image || selectedLanguages.length === 0) return;

    setIsLoading(true);

    const response = await fetch("/api/generateDescriptions", {
      method: "POST",
      body: JSON.stringify({
        languages: selectedLanguages,
        imageUrl: image,
      }),
    });

    const descriptions = await response.json();
    console.log(descriptions);

    setDescriptions(descriptions);
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-xl mx-auto mt-20 p-6">
      <h2 className="text-2xl font-bold text-center mb-1">
        Product Description Generator
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6 text-balance">
        Upload an image of your product to generate descriptions in multiple
        languages.
      </p>
      <div>
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 hover:border-primary transition-colors aspect-video m-12">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Uploaded product"
                className="max-h-64 rounded"
              />
              <Button
                variant="default"
                size="icon"
                className="absolute top-0 right-0"
                onClick={() => setImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 mb-2" />
                <span>Upload product image</span>
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </Label>
          )}
        </div>
        <div className="grid grid-cols-2">
          <div>
            <p className="font-bold text-sm text-gray-900">Languages</p>
            <p className="text-sm text-gray-500 mt-2">
              Choose up to 3 languages for the product descriptions.
            </p>
          </div>

          <ToggleGroup
            type="multiple"
            className="flex flex-wrap justify-start gap-2 mx-auto "
            onValueChange={setSelectedLanguages}
          >
            {languages.map((lang) => (
              <ToggleGroupItem
                variant="outline"
                key={lang.code}
                value={lang.code}
                disabled={
                  selectedLanguages.length === 3 &&
                  !selectedLanguages.includes(lang.code)
                }
                className="text-xs rounded-full px-3 font-medium shadow-none py-1 data-[state=on]:bg-black data-[state=on]:text-white"
              >
                {lang.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <hr className="mt-6" />
        <div className="grid grid-cols-2 mt-6">
          <div>
            <p className="font-bold text-sm text-gray-900">Model</p>
            <p className="text-sm text-gray-500 mt-2">
              Select the Llama 3.2 vision model you want to use.
            </p>
          </div>

          <ToggleGroup
            type="single"
            className="flex flex-wrap justify-start gap-2 mx-auto "
            onValueChange={setModel}
            value={model}
          >
            {models.map((model) => (
              <ToggleGroupItem
                variant="outline"
                key={model.value}
                value={model.value}
                className="text-xs rounded-full px-3 font-medium shadow-none py-1 data-[state=on]:bg-black data-[state=on]:text-white"
              >
                {model.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <hr className="mt-6" />

        <div className="text-right mt-20">
          <Button
            onClick={handleSubmit}
            disabled={!image || selectedLanguages.length === 0 || isLoading}
          >
            {isLoading ? "Generating..." : "Generate Descriptions"}
          </Button>
        </div>
      </div>
      {Object.keys(descriptions).length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Generated Descriptions</h3>
          {descriptions.map(({ language, description }) => (
            <div key={language}>
              <h4 className="font-medium">
                {languages.find((l) => l.code === language)?.name}
              </h4>
              <p className="mt-1">{description}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
