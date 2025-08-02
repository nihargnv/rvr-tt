import cv2

# Set the GStreamer pipeline
pipeline = (
    "udpsrc port=5000 ! application/x-rtp, payload=96 ! "
    "rtph264depay ! avdec_h264 ! videoconvert ! appsink"
)

# Capture the video
cap = cv2.VideoCapture(pipeline, cv2.CAP_GSTREAMER)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print("Failed to retrieve frame.")
        break

    cv2.imshow("Video Feed", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
