"use client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldGroup } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { type PersonalizationData } from "@/types/Personalization";

export function PersonalizationMenu() {
  const personalizationStorageKey = "personalization";

  const [personalizationData, setPersonalizationData] =
    useState<PersonalizationData>(() => {
      if (typeof window === "undefined") {
        return {
          occupation: "",
          workStyle: "",
          career: "",
          skills: "",
          hobbies: "",
        };
      }

      const saved = localStorage.getItem(personalizationStorageKey);
      return saved
        ? (JSON.parse(saved) as PersonalizationData)
        : {
            occupation: "",
            workStyle: "",
            career: "",
            skills: "",
            hobbies: "",
          };
    });

  useEffect(() => {
    localStorage.setItem(
      personalizationStorageKey,
      JSON.stringify(personalizationData)
    );
  }, [personalizationData, personalizationStorageKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalizationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkStyleChange = (value: string) => {
    setPersonalizationData((prev) => ({ ...prev, workStyle: value }));
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="w-fit">
            Personalization
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Personalize your suggestions</DialogTitle>
            <DialogDescription>
              These are optional and you can write whatever
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="gap-4">
            <Field>
              <Label htmlFor="occupation-1">Occupation and your level</Label>
              <Input
                id="occupation-1"
                name="occupation"
                placeholder="Java programmer - 1 year of experience"
                value={personalizationData.occupation}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Label htmlFor="work-style">Work style</Label>
              <Select
                value={personalizationData.workStyle}
                onValueChange={handleWorkStyleChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your work style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="deep focus">Deep focus</SelectItem>
                    <SelectItem value="quick tasks">Quick tasks</SelectItem>
                    <SelectItem value="mix of quick tasks and deep focus">
                      Mixed
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="career">Career goal</Label>
              <Input
                id="career"
                name="career"
                placeholder="Product manager"
                value={personalizationData.career}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Label htmlFor="skills-1">Skill priorities</Label>
              <Input
                id="skills"
                name="skills"
                placeholder="Math, english speaking"
                value={personalizationData.skills}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Label htmlFor="hobbies">Hobbies</Label>
              <Input
                id="hobbies"
                name="hobbies"
                placeholder="Pottery, gardening"
                value={personalizationData.hobbies}
                onChange={handleChange}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
