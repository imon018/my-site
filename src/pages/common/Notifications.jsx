import { FiBell, FiTrash2, FiCheck } from "react-icons/fi";
import { useNotifications } from "../../context/NotificationContext";

export default function Notifications() {
  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    removeNotification,
    removeAllNotifications,
  } = useNotifications();

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Notifications
        </h1>

        <div className="flex gap-2">

          <button
            onClick={markAllAsRead}
            className="px-4 py-2 rounded-lg bg-green-600 text-white"
          >
            Mark All Read
          </button>

          <button
            onClick={removeAllNotifications}
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
          >
            Delete All
          </button>

        </div>

      </div>

      {notifications.length === 0 ? (

        <div className="bg-white rounded-xl p-12 text-center shadow">

          <FiBell
            className="mx-auto mb-4 text-gray-400"
            size={50}
          />

          <h2 className="text-xl font-semibold">
            No Notifications
          </h2>

          <p className="text-gray-500 mt-2">
            You're all caught up.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {notifications.map((item) => (

            <div
              key={item.id}
              className={`rounded-xl border p-4 flex justify-between items-start ${
                item.isRead
                  ? "bg-white"
                  : "bg-amber-50 border-amber-300"
              }`}
            >

              <div>

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-1">
                  {item.message}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {item.createdAt?.toDate?.().toLocaleString()}
                </p>

              </div>

              <div className="flex gap-2">

                {!item.isRead && (

                  <button
                    onClick={() =>
                      markAsRead(item.id)
                    }
                    className="text-green-600"
                  >
                    <FiCheck />
                  </button>

                )}

                <button
                  onClick={() =>
                    removeNotification(item.id)
                  }
                  className="text-red-600"
                >
                  <FiTrash2 />
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
