import GalleryDialog from "@/components/gallery/gallery-dialog";
import GalleryPageContent from "@/components/gallery/gallery-page-content";

const GalleryPage = () => {
  return (
    <main className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            Photo Gallery
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Gallery</h1>
          <p className="text-muted-foreground">Visual history of Lamando</p>
        </div>

        <GalleryDialog />
      </header>

      <GalleryPageContent />
    </main>
  );
};

export default GalleryPage;
