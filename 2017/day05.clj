(require '[clojure.string :as str])

(def normalised-data
  (->> (slurp "2017/inputs/day05.txt")
       str/split-lines
       (mapv read-string)))

(defn find-exit-maker [modifying-func]
  (fn [instructions]
    (loop [ins instructions
           curs 0
           cnt 0]
      (if (or (< curs 0) (>= curs (count ins)))
        cnt
        (recur
         (modifying-func ins curs)
         (+ (nth ins curs 1) curs)
         (inc cnt))))))

; pt 1:
(defn increment-at [l n]
  (update l n inc))

(time ((find-exit-maker increment-at) normalised-data))
; => "Elapsed time: 544.141253 msecs"

(defn increment-or-decrement-at [l n]
  (update l n #(if (> % 2) (dec %) (inc %))))

(time ((find-exit-maker increment-or-decrement-at) normalised-data))
; => "Elapsed time: 36745.40914 msecs"
