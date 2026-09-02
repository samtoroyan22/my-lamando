import GalleryDialog from "@/components/gallery/gallery-dialog";
import GalleryPageContent from "@/components/gallery/gallery-page-content";

const GalleryPage = () => {
  return (
    <main>
      <div className="py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Gallery</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Visual history of your Lamando.
          </p>
        </div>

        <GalleryDialog />
      </div>

      <GalleryPageContent />
    </main>
  );
};

export default GalleryPage;
