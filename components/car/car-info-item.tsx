interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}

function InfoItem({ icon, label, value, mono = false }: InfoItemProps) {
  return (
    <div className="rounded-xl border bg-muted/30 p-4 transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}

        <span className="text-sm">{label}</span>
      </div>

      <p className={`mt-2 font-medium ${mono ? "font-mono text-sm" : ""}`}>
        {value}
      </p>
    </div>
  );
}

export default InfoItem;
