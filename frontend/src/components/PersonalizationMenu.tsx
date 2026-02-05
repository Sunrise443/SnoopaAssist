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

export function PersonalizationMenu() {
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
              />
            </Field>
            <Field>
              <Label htmlFor="work-style">Work style</Label>
              <Select>
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
              <Input id="career" name="career" placeholder="Product manager" />
            </Field>
            <Field>
              <Label htmlFor="skills-1">Skill priorities</Label>
              <Input
                id="skills"
                name="skills"
                placeholder="Math, english speaking"
              />
            </Field>
            <Field>
              <Label htmlFor="hobbies">Hobbies</Label>
              <Input
                id="hobbies"
                name="hobbies"
                placeholder="Pottery, gardening"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
