// import ResourceListPage from "../components/ResourceListPage";
// import galleryService from "../services/galleryService";

// // const CATEGORY_OPTIONS = [
// //   { value: "water_slides", label: "Water Slides" },
// //   { value: "lazy_river", label: "Lazy River" },
// //   { value: "kiddie_zone", label: "Kiddie Splash Zone" },
// //   { value: "dining", label: "Dining & Delights" },
// //   { value: "events", label: "Events" },
// //   { value: "general", label: "General" },
// // ];

// const CATEGORY_OPTIONS = [
//   { value: "water_slides", label: "Thrill Slides" },
//   { value: "lazy_river", label: "Family Memory" },
//   { value: "kiddie_zone", label: "Kids Zone" },
//   { value: "dining", label: "Guest Memories" },
//   { value: "events", label: "Happy moments" },
//   { value: "general", label: "General" },
// ];

// export default function GalleryPage() {
//   return (
//     <ResourceListPage
//       title="Gallery"
//       service={galleryService}
//       addLabel="Add Photo"

//       columns={[
//         { key: "title", label: "Title" },
//         { key: "category", label: "Category" },
//         { key: "display_order", label: "Order" },
//       ]}

//       fields={[
//         {
//           name: "title",
//           label: "Title",
//           type: "text",
//           required: true,
//         },

//         {
//           name: "image",
//           label: "Image",
//           type: "file",
//         },

//         {
//           name: "category",
//           label: "Category",
//           type: "select",
//           options: CATEGORY_OPTIONS,
//         },

//         {
//           name: "display_order",
//           label: "Display Order",
//           type: "number",
//         },
//       ]}
//     />
//   );
// }


import ResourceListPage from "../components/ResourceListPage";
import galleryService from "../services/galleryService";

const CATEGORY_OPTIONS = [
  { value: "water_slides", label: "Thrill Slides" },
  { value: "general", label: "Family Memory" },
  { value: "kiddie_zone", label: "Kids Zone" },
  { value: "lazy_river", label: "Guest Memories" },
  // { value: "dining", label: "Happy moments" },
  { value: "events", label: "Happy moments" },
];

const CATEGORY_LABELS = {
  water_slides: "Thrill Slides",
  general: "Family Memory",
  kiddie_zone: "Kids Zone",
  lazy_river: "Guest Memories",
  // dining: "Happy moments",
  events: "Happy moments",
};

export default function GalleryPage() {
  return (
    <ResourceListPage
      title="Gallery"
      service={galleryService}
      addLabel="Add Photo"

      columns={[
        { key: "title", label: "Title" },

        {
          key: "category",
          label: "Category",
          render: (item) =>
            CATEGORY_LABELS[item.category] || item.category,
        },

        { key: "display_order", label: "Order" },
      ]}

      fields={[
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
        },

        {
          name: "image",
          label: "Image",
          type: "file",
        },

        {
          name: "category",
          label: "Category",
          type: "select",
          options: CATEGORY_OPTIONS,
        },

        {
          name: "display_order",
          label: "Display Order",
          type: "number",
        },
      ]}
    />
  );
}