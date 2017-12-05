(require '[clojure.string :as str])

(def normalised-data
    (->> (slurp "2017/inputs/day05.txt")
         str/split-lines
         (map read-string)))

(defn increment-at [l n]
  (map
   #(if (= (first %) n) (inc (last %)) (last %))
   (map-indexed vector l)))

(defn find-exit [instructions]
  (loop [ins instructions
         curs 0
         cnt 0]
    (if (or (< curs 0) (>= curs (count ins)))
      cnt
      (recur
       (increment-at ins curs)
       (+ (nth ins curs 1) curs)
       (inc cnt)))))

(find-exit normalised-data)