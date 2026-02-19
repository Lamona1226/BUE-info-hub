import { Building2, Layers3, MapPinned, Wrench } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DataCard } from "@/components/DataCard";
import { Badge } from "@/components/ui/badge";

interface BuildingPlaceholder {
  name: string;
  code: string;
  status: "Ready for 2D map link" | "Ready for 3D model link";
  services: string[];
}

const buildingPlaceholders: BuildingPlaceholder[] = [
  {
    name: "Main Academic Building",
    code: "A",
    status: "Ready for 2D map link",
    services: ["Student Affairs", "Admissions Office", "Lecture Halls"],
  },
  {
    name: "Engineering Complex",
    code: "E",
    status: "Ready for 3D model link",
    services: ["Engineering Labs", "Faculty Offices", "Workshop Areas"],
  },
  {
    name: "Library & Learning Commons",
    code: "L",
    status: "Ready for 2D map link",
    services: ["Library Services", "Quiet Study Rooms", "Research Support"],
  },
  {
    name: "Medical Services & Clinic",
    code: "M",
    status: "Ready for 3D model link",
    services: ["Campus Clinic", "Medical Support", "Emergency Point"],
  },
  {
    name: "Sports & Activities Center",
    code: "S",
    status: "Ready for 2D map link",
    services: ["Sports Facilities", "Student Activities", "Event Spaces"],
  },
  {
    name: "Administration Building",
    code: "H",
    status: "Ready for 3D model link",
    services: ["Finance", "Human Resources", "IT Support Desk"],
  },
];

export const MapPage = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Campus Map"
        description="Future-ready map container for 2D and 3D building exploration."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <DataCard title="Map Viewer">
          <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6">
            <div className="flex items-center gap-2 text-foreground">
              <MapPinned className="h-5 w-5 text-primary" />
              <p className="font-medium">Interactive map area</p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              This section is prepared for future 2D and 3D campus map integration.
              Building markers and navigation layers will be connected here.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-background p-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Layers3 className="h-4 w-4 text-primary" />
                  2D Map Layer
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Placeholder for floor plans and marker overlays.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Wrench className="h-4 w-4 text-primary" />
                  3D Map Layer
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Placeholder for 3D building models and navigation.
                </p>
              </div>
            </div>
          </div>
        </DataCard>

        <div className="lg:col-span-2">
          <DataCard title="Buildings & Services">
            <div className="grid gap-4 sm:grid-cols-2">
              {buildingPlaceholders.map((building) => (
                <div
                  key={building.code}
                  className="rounded-xl border border-border bg-background p-4"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold text-foreground">{building.name}</h3>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Building code: {building.code}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-[11px]">
                      {building.status}
                    </Badge>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground">
                      Services to display:
                    </p>
                    {building.services.map((service) => (
                      <p
                        key={`${building.code}-${service}`}
                        className="rounded-md bg-muted/40 px-2 py-1 text-xs text-foreground"
                      >
                        {service}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DataCard>
        </div>
      </div>
    </div>
  );
};
