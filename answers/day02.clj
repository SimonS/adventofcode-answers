(def normalised-data
  (->> (slurp "answers/inputs/day02.txt")
       clojure.string/split-lines
       (map #(map read-string (clojure.string/split % #"x")))))

(defn paper [l w h] (let [sides [(* l w) (* w h) (* h l)]]
                      (+ (* 2 (reduce + sides))
                         (apply min sides))))

(defn ribbon [l w h] (let [surface-area (* l w h )
                           perimeter (reduce +
                                             (map (partial * 2)
                                                  (take 2 (sort [l w h]))))]
                       (+ surface-area perimeter)))

(defn total-data [func]
  (reduce #(+ %1 (apply func (vec %2)))
          0 normalised-data))

;; Part 1
(total-data ribbon)

;; Part 2
(total-data paper)
