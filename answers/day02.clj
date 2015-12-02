(def normalised-data
  (->> (slurp "answers/inputs/day02.txt")
       clojure.string/split-lines
       (map #(map read-string (clojure.string/split % #"x")))))

(defn paper [[l w h]] (let [sides [(* l w) (* w h) (* h l)]]
                      (+ (* 2 (reduce + sides))
                         (apply min sides))))

(defn ribbon [dimensions]
  (let [surface-area (apply * dimensions)
        perimeter (->> (sort dimensions)
                       (take 2)
                       (map (partial * 2))
                       (reduce +))]
    (+ surface-area perimeter)))

(defn total-data [func]
  (->> (map func normalised-data)
       (reduce +)))

;; Part 1
(total-data ribbon)

;; Part 2
(total-data paper)
